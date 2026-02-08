import csv
import json
import re
from collections import Counter
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "config" / "targets.json"
REVIEWS_PATH = ROOT / "data" / "review_ingest_template.csv"
OUTPUT_PATH = ROOT / "reports" / "weekly_review_insights.json"

STOPWORDS = {
    "the", "and", "a", "an", "of", "to", "in", "for", "on", "at", "is", "was",
    "were", "it", "this", "that", "with", "we", "our", "they", "their", "i", "me",
    "my", "you", "your", "but", "so", "as", "very", "be", "are", "from", "or",
    "by", "had", "has", "have", "not", "too", "also", "there", "here", "if"
}


def ascii_only(text: str) -> str:
    return text.encode("ascii", "ignore").decode("ascii")


def load_config():
    with open(CONFIG_PATH, "r", encoding="utf-8-sig") as f:
        return json.load(f)


def load_reviews():
    reviews = []
    if not REVIEWS_PATH.exists():
        return reviews
    with open(REVIEWS_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            text = (row.get("review_text") or "").strip()
            if not text or "REPLACE_ME" in text:
                continue
            reviews.append({
                "source": row.get("source") or "",
                "review_id": row.get("review_id") or "",
                "review_date": row.get("review_date") or "",
                "rating": row.get("rating") or "",
                "reviewer_name": row.get("reviewer_name") or "Anonymous",
                "review_text": text,
                "url": row.get("url") or ""
            })
    return reviews


def sentence_split(text: str):
    parts = re.split(r"[.!?]+", text)
    return [p.strip() for p in parts if p.strip()]


def tokenize(text: str):
    tokens = re.findall(r"[a-zA-Z]+", text.lower())
    return [t for t in tokens if t not in STOPWORDS]


def extract_phrases(reviews):
    counter = Counter()
    for review in reviews:
        tokens = tokenize(review["review_text"])
        for n in (2, 3, 4):
            for i in range(len(tokens) - n + 1):
                phrase = " ".join(tokens[i:i + n])
                counter[phrase] += 1
    phrases = [p for p, _ in counter.most_common(20)]
    return phrases[:15]


def build_snippets(reviews):
    sentences = []
    for review in reviews:
        for sentence in sentence_split(review["review_text"]):
            word_count = len(sentence.split())
            if 4 <= word_count <= 24:
                sentences.append(sentence)
    if not sentences:
        return []
    snippets = []
    for sentence in sentences[:8]:
        snippets.append(sentence)
    return snippets[:8]


def build_faqs(phrases, reviews):
    faqs = []
    sentences = []
    for review in reviews:
        sentences.extend(sentence_split(review["review_text"]))
    for phrase in phrases[:5]:
        question = f"Do guests mention {phrase}?"
        answer = sentences[0] if sentences else ""
        if answer:
            faqs.append({"question": question, "answer": answer})
    return faqs


def build_schema_reviews(reviews):
    items = []
    for review in reviews[:5]:
        body = review["review_text"]
        if len(body) > 280:
            body = body[:277] + "..."
        items.append({
            "author": review["reviewer_name"],
            "rating": review["rating"],
            "date": review["review_date"],
            "reviewBody": body
        })
    return items


def build_insertions(reviews):
    suggestions = []
    for review in reviews[:6]:
        text = review["review_text"]
        lower = text.lower()
        page = "Luxury resort near Delhi NCR"
        if "wedding" in lower:
            page = "Destination wedding resort Rajasthan"
        elif "sariska" in lower:
            page = "Resort near Sariska"
        elif "alwar" in lower:
            page = "Best resort in Alwar"
        elif "food" in lower or "catering" in lower:
            page = "Best Food Catering Company"
        snippet = sentence_split(text)[0] if sentence_split(text) else text
        suggestions.append({
            "page": page,
            "suggested_text": snippet,
            "source_review_id": review["review_id"]
        })
    return suggestions


def build_summary(reviews, phrases):
    if not reviews:
        return "No valid reviews found for this period."
    ratings = [float(r["rating"]) for r in reviews if str(r["rating"]).replace(".", "", 1).isdigit()]
    avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else "N/A"
    top_phrases = ", ".join(phrases[:4]) if phrases else ""
    summary = (
        f"Total reviews analyzed: {len(reviews)}. "
        f"Average rating: {avg_rating}. "
        f"Common themes include: {top_phrases}. "
        "Use the highlighted phrases to update FAQs and on-page snippets."
    )
    return summary


def main():
    config = load_config()
    reviews = load_reviews()
    phrases = extract_phrases(reviews)
    snippets = build_snippets(reviews)
    faqs = build_faqs(phrases, reviews)
    schema_reviews = build_schema_reviews(reviews)
    insertions = build_insertions(reviews)
    output = {
        "summary": build_summary(reviews, phrases),
        "keyword_phrases": phrases,
        "snippet_candidates": snippets,
        "faq_items": faqs,
        "schema_reviews": schema_reviews,
        "insertion_suggestions": insertions,
        "generated_at": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "brand": config.get("brand"),
        "target_keywords": config.get("target_keywords", [])
    }
    output = json.loads(ascii_only(json.dumps(output, ensure_ascii=False)))
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
