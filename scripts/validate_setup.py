import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NAP_JSON = ROOT / "data" / "nap_master.json"
NAP_CSV = ROOT / "data" / "nap_master.csv"
CITATIONS = ROOT / "data" / "citation_tracker_template.csv"
REVIEWS = ROOT / "data" / "review_ingest_template.csv"
CRAWL = ROOT / "data" / "tech_seo_crawl_template.csv"

errors = []
warnings = []


def has_placeholder(value: str) -> bool:
    return "REPLACE_ME" in (value or "")


def load_json(path: Path):
    try:
        with open(path, "r", encoding="utf-8-sig") as f:
            return json.load(f)
    except Exception as exc:
        errors.append(f"Failed to read JSON: {path} ({exc})")
        return None


def check_nap_json():
    data = load_json(NAP_JSON)
    if not data:
        return
    required = [
        ("business_name", data.get("business_name")),
        ("address.line1", data.get("address", {}).get("line1")),
        ("address.city", data.get("address", {}).get("city")),
        ("address.state", data.get("address", {}).get("state")),
        ("address.postal_code", data.get("address", {}).get("postal_code")),
        ("phone", data.get("phone")),
        ("email", data.get("email")),
        ("website", data.get("website"))
    ]
    for name, value in required:
        if not value or has_placeholder(value):
            errors.append(f"NAP JSON missing or placeholder: {name}")

    email = data.get("email", "")
    if email and not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        warnings.append("NAP JSON email format looks invalid.")

    website = data.get("website", "")
    if website and not website.startswith("http"):
        warnings.append("NAP JSON website should start with http or https.")

    lat = data.get("geo", {}).get("lat")
    lng = data.get("geo", {}).get("lng")
    try:
        if lat is not None:
            float(lat)
        if lng is not None:
            float(lng)
    except ValueError:
        warnings.append("NAP JSON geo coordinates should be numeric.")


def check_nap_csv():
    if not NAP_CSV.exists():
        errors.append("NAP CSV not found.")
        return
    with open(NAP_CSV, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        if not rows:
            errors.append("NAP CSV has no rows.")
            return
        row = rows[0]
        required_fields = ["business_name", "address_line1", "city", "state", "postal_code", "phone", "email", "website"]
        for field in required_fields:
            value = (row.get(field) or "").strip()
            if not value or has_placeholder(value):
                errors.append(f"NAP CSV missing or placeholder: {field}")


def check_reviews():
    if not REVIEWS.exists():
        errors.append("Review ingest CSV not found.")
        return
    with open(REVIEWS, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = [r for r in reader if (r.get("review_text") or "").strip() and not has_placeholder(r.get("review_text") or "")]
        if not rows:
            warnings.append("No real review rows found. Weekly insights will be empty.")


def check_citations():
    if not CITATIONS.exists():
        errors.append("Citation tracker CSV not found.")
        return
    with open(CITATIONS, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = [r for r in reader if (r.get("listing_name") or "").strip()]
        if not rows:
            warnings.append("Citation tracker has no rows.")


def check_crawl():
    if not CRAWL.exists():
        errors.append("Tech crawl CSV not found.")
        return
    with open(CRAWL, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = [r for r in reader if (r.get("url") or "").strip() and not has_placeholder(r.get("url") or "")]
        if not rows:
            warnings.append("Tech crawl data is empty. Monthly tech report will be minimal.")


def main():
    check_nap_json()
    check_nap_csv()
    check_reviews()
    check_citations()
    check_crawl()

    if errors:
        print("Setup validation failed:")
        for err in errors:
            print(f"- {err}")
        if warnings:
            print("Warnings:")
            for warn in warnings:
                print(f"- {warn}")
        sys.exit(1)

    print("Setup validation passed.")
    if warnings:
        print("Warnings:")
        for warn in warnings:
            print(f"- {warn}")


if __name__ == "__main__":
    main()
