# Local Citations & Listings Automation Agent

Purpose
- Build authority with consistent citations and listings.
- Track approvals and detect NAP inconsistencies or duplicates.

Inputs
- `data/nap_master.json`
- `data/citation_sources_template.csv`
- `data/citation_tracker_template.csv`

Outputs
- Updated `data/citation_tracker_template.csv`
- Monthly report in `reports/monthly_citation_health_report_template.md`

Workflow
1. Load master NAP from `data/nap_master.json` and lock it as the single source of truth.
2. Populate `data/citation_sources_template.csv` with target directories and portals.
3. For each source, submit a listing using the master NAP.
4. Log each submission in `data/citation_tracker_template.csv` with status `submitted`.
5. Check approval status weekly and update `status`, `approval_date`, and `listing_url`.
6. Run a NAP consistency audit weekly using the prompt in `prompts/citation_audit_prompt.md`.
7. Flag duplicates and mismatches, then queue fixes.
8. Generate the monthly health report from the tracker.

NAP Match Scoring
- `nap_match_score` = average of name, address, and phone matches.
- `name_match`, `address_match`, `phone_match` should be `true` or `false`.
- Any listing with score under 1.0 is a fix task.

Duplicate Detection Rules
- Same phone with different address.
- Same name with different phone.
- Multiple listings on the same directory.

Automation Blueprint
- Store trackers in Google Sheets.
- Use Apps Script or Make/Zapier to trigger weekly audits.
- Use a browser automation tool for submissions that lack APIs.

Escalation Rules
- NAP mismatch: fix within 7 days.
- Duplicate listing: merge or remove within 14 days.
- No response after 30 days: follow up or resubmit.
