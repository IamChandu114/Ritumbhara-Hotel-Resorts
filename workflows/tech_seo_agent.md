# Tech SEO Health Agent

Purpose
- Keep the site technically perfect and crawlable.
- Detect regressions in speed, indexability, and structured data.

Inputs
- Site URL list or sitemap export
- Recent crawl data

Outputs
- Tech SEO audit log
- Monthly tech SEO report

Weekly Checks
1. Crawl for 404s, 500s, and redirect chains.
2. Validate canonical tags and indexability rules.
3. Check sitemap freshness and robots.txt accessibility.
4. Validate structured data using schema tests.
5. Track Core Web Vitals snapshots.

Monthly Checks
1. Lighthouse or PageSpeed tests on top landing pages.
2. Mobile usability scan.
3. Internal linking gaps for target keyword pages.

Escalation Rules
- Any 5xx errors: fix within 48 hours.
- Redirect chains: fix within 7 days.
- Schema errors: fix within 7 days.
- Core Web Vitals regression: fix within 14 days.
