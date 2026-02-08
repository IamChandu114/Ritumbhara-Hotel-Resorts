# Updated Implementation Guide

Goal
Set up self-running agents for citations, reviews, and tech SEO using the templates and scripts in this repo.

Core Files
- Master NAP: `data/nap_master.json` and `data/nap_master.csv`
- Citation tracker: `data/citation_tracker_template.csv`
- Review ingest: `data/review_ingest_template.csv`
- Tech crawl export: `data/tech_seo_crawl_template.csv`

Automations (Local Scripts)
1. Weekly review analysis:
   - Command: `python scripts/run_weekly.py`
   - Output: `reports/weekly_review_insights.json`
2. Monthly citation health report:
   - Command: `python scripts/citation_health_report.py`
   - Output: `reports/monthly_citation_health_report_YYYY-MM.md`
3. Monthly tech SEO report:
   - Command: `python scripts/tech_seo_audit.py`
   - Output: `reports/tech_seo_health_report_YYYY-MM.md`
4. Monthly batch runner:
   - Command: `python scripts/run_monthly.py`
5. Production validation:
   - Command: `python scripts/validate_setup.py`
   - Checks for placeholder data and missing fields before running automations.

Recommended Stack (Optional)
- Google Sheets for trackers
- Apps Script or Make/Zapier for scheduling
- Browser automation for manual portal submissions

Quality Checklist
- NAP consistency is 100 percent across listings
- Duplicate listings are removed or merged
- Reviews are translated into snippets and FAQs every week
- Schema is updated with real reviews only

Notes
- Replace `REPLACE_ME` values before running scripts for real data.
- Full live automation (directory submission + GBP review pull) requires client API/account access, but the system is production-ready once credentials are provided.
