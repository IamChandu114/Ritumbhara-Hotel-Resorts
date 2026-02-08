import csv
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRACKER_PATH = ROOT / "data" / "citation_tracker_template.csv"
REPORT_PATH = ROOT / "reports"


def parse_bool(value):
    return str(value).strip().lower() in {"true", "1", "yes"}


def parse_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def load_rows():
    rows = []
    if not TRACKER_PATH.exists():
        return rows
    with open(TRACKER_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = (row.get("listing_name") or "").strip()
            if not name or "REPLACE_ME" in name:
                continue
            rows.append(row)
    return rows


def summarize(rows):
    total = len(rows)
    approved = sum(1 for r in rows if (r.get("status") or "").lower() == "approved")
    pending = sum(1 for r in rows if (r.get("status") or "").lower() in {"pending", "submitted"})
    duplicates = sum(1 for r in rows if (r.get("status") or "").lower() == "duplicate" or (r.get("duplicate_of") or "").strip())

    scores = []
    for r in rows:
        score = parse_float(r.get("nap_match_score"))
        if score is None:
            name_match = parse_bool(r.get("name_match"))
            address_match = parse_bool(r.get("address_match"))
            phone_match = parse_bool(r.get("phone_match"))
            if any([name_match, address_match, phone_match]):
                score = (name_match + address_match + phone_match) / 3
        if score is not None:
            scores.append(score)
    nap_percent = round(sum(scores) / len(scores) * 100, 1) if scores else 0

    return total, approved, pending, nap_percent, duplicates


def build_report(total, approved, pending, nap_percent, duplicates):
    month = datetime.now().strftime("%B %Y")
    report = [
        "# Monthly Citation Health Report",
        "",
        f"Report Month: {month}",
        "Prepared By: SEO Automation System",
        "",
        "Summary Metrics",
        f"- Total citations tracked: {total}",
        f"- Approved listings: {approved}",
        f"- Pending approvals: {pending}",
        f"- NAP consistency percent: {nap_percent}%",
        f"- Duplicates detected: {duplicates}",
        "",
        "Top Wins",
        "- Consistent NAP usage on priority directories",
        "- Approval progress tracked weekly",
        "- Duplicate detection active",
        "",
        "Top Issues",
        "- Fill missing directory submissions",
        "- Resolve pending approvals",
        "- Fix any NAP mismatches",
        "",
        "Actions Completed",
        "- Updated tracker and status fields",
        "- Reviewed approvals",
        "- Logged duplicate listings",
        "",
        "Actions Planned Next Month",
        "- Submit remaining directories",
        "- Resolve pending approvals",
        "- Audit NAP consistency",
        "",
        "Notes",
        "- Replace placeholders with live data for client reporting",
        ""
    ]
    return "\n".join(report)


def main():
    rows = load_rows()
    total, approved, pending, nap_percent, duplicates = summarize(rows)
    report_text = build_report(total, approved, pending, nap_percent, duplicates)
    REPORT_PATH.mkdir(parents=True, exist_ok=True)
    filename = f"monthly_citation_health_report_{datetime.now().strftime('%Y-%m')}.md"
    out_path = REPORT_PATH / filename
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(report_text)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
