import csv
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CRAWL_PATH = ROOT / "data" / "tech_seo_crawl_template.csv"
REPORT_PATH = ROOT / "reports"


def parse_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def load_rows():
    rows = []
    if not CRAWL_PATH.exists():
        return rows
    with open(CRAWL_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = (row.get("url") or "").strip()
            if not url or "REPLACE_ME" in url:
                continue
            rows.append(row)
    return rows


def summarize(rows):
    total = len(rows)
    errors_4xx = 0
    errors_5xx = 0
    redirect_chains = 0
    canonical_issues = 0
    schema_errors = 0
    lcp_vals = []
    inp_vals = []
    cls_vals = []

    for r in rows:
        status = int(r.get("status") or 0)
        if 400 <= status < 500:
            errors_4xx += 1
        if 500 <= status < 600:
            errors_5xx += 1
        redirect_len = int(r.get("redirect_chain_length") or 0)
        if redirect_len > 1:
            redirect_chains += 1
        url = (r.get("url") or "").strip()
        canonical = (r.get("canonical") or "").strip()
        if canonical and canonical != url:
            canonical_issues += 1
        has_schema = str(r.get("has_schema") or "").strip().lower()
        if has_schema in {"false", "0", "no"}:
            schema_errors += 1
        lcp = parse_float(r.get("lcp"))
        inp = parse_float(r.get("inp"))
        cls = parse_float(r.get("cls"))
        if lcp is not None:
            lcp_vals.append(lcp)
        if inp is not None:
            inp_vals.append(inp)
        if cls is not None:
            cls_vals.append(cls)

    avg_lcp = round(sum(lcp_vals) / len(lcp_vals), 2) if lcp_vals else "N/A"
    avg_inp = round(sum(inp_vals) / len(inp_vals), 2) if inp_vals else "N/A"
    avg_cls = round(sum(cls_vals) / len(cls_vals), 2) if cls_vals else "N/A"

    return {
        "total": total,
        "errors_4xx": errors_4xx,
        "errors_5xx": errors_5xx,
        "redirect_chains": redirect_chains,
        "canonical_issues": canonical_issues,
        "schema_errors": schema_errors,
        "avg_lcp": avg_lcp,
        "avg_inp": avg_inp,
        "avg_cls": avg_cls
    }


def build_report(metrics):
    month = datetime.now().strftime("%B %Y")
    report = [
        "# Monthly Tech SEO Health Report",
        "",
        f"Report Month: {month}",
        "Prepared By: SEO Automation System",
        "",
        "Summary Metrics",
        f"- Pages crawled: {metrics['total']}",
        f"- 4xx errors: {metrics['errors_4xx']}",
        f"- 5xx errors: {metrics['errors_5xx']}",
        f"- Redirect chains: {metrics['redirect_chains']}",
        f"- Canonical issues: {metrics['canonical_issues']}",
        f"- Schema errors: {metrics['schema_errors']}",
        "",
        "Performance Snapshot",
        f"- LCP: {metrics['avg_lcp']}",
        f"- INP: {metrics['avg_inp']}",
        f"- CLS: {metrics['avg_cls']}",
        "",
        "Top Issues",
        "- Fix any 5xx errors immediately",
        "- Resolve canonical mismatches",
        "- Address schema errors",
        "",
        "Fixes Completed",
        "- Weekly crawl performed",
        "- Logged redirect chains",
        "- Reviewed performance metrics",
        "",
        "Planned Fixes Next Month",
        "- Reduce LCP on high-traffic pages",
        "- Resolve remaining 4xx errors",
        "- Expand schema coverage",
        ""
    ]
    return "\n".join(report)


def main():
    rows = load_rows()
    metrics = summarize(rows)
    report_text = build_report(metrics)
    REPORT_PATH.mkdir(parents=True, exist_ok=True)
    filename = f"tech_seo_health_report_{datetime.now().strftime('%Y-%m')}.md"
    out_path = REPORT_PATH / filename
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(report_text)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
