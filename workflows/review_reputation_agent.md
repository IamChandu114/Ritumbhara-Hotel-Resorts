# Review & Reputation SEO Loop Agent

Purpose
- Turn reviews into SEO content, FAQs, and schema.
- Extract keyword phrases and push them into pages, blogs, and GMB posts.

Inputs
- `data/review_ingest_template.csv`
- `config/targets.json`

Outputs
- Weekly review insights JSON from `prompts/review_analysis_prompt.md`
- Suggested page insertions and FAQ updates
- Review schema snippet using `schemas/testimonial_schema_template.json`

Workflow
1. Ingest new reviews weekly from Google, travel directories, and social channels.
2. Run the review analysis prompt on the new reviews.
3. Extract keyword phrases like "peaceful", "near Sariska", "wedding", "luxury", "catering".
4. Generate SEO snippets, FAQs, and testimonial schema.
5. Suggest insertion points on site pages and blog posts.
6. Publish 1 to 2 Google Business Profile posts from top reviews.
7. Log all updates in a content change log.

Quality Rules
- Use only language that appears in reviews.
- Never invent amenities or distances.
- If a keyword is missing in reviews, do not force it.

Cadence
- Weekly review analysis.
- Monthly content refresh on key landing pages.
