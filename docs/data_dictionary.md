# Data Dictionary

Citation Tracker
- listing_name: Business name used on the listing.
- directory_category: Category like travel directory or local portal.
- directory_name: Name of the directory.
- listing_url: URL of the live listing.
- status: planned, submitted, pending, approved, rejected, duplicate.
- submit_date: Date of submission.
- approval_date: Date approved.
- last_checked: Last verification date.
- nap_match_score: 0 to 1 score of NAP consistency.
- name_match: true or false.
- address_match: true or false.
- phone_match: true or false.
- duplicate_of: URL of the primary listing if duplicate.
- login_email: Account used for submission.
- notes: Free text notes.

Citation Sources
- directory_category: Ecosystem, travel directory, local portal.
- directory_name: Source name.
- domain_or_url: Submission URL.
- submission_method: manual or api.
- login_required: true or false.
- status: priority, required, optional.
- notes: Extra guidance.

Review Ingest
- source: Google, Tripadvisor, Booking, or other.
- review_id: Source review id.
- review_date: Date of review.
- rating: Numeric rating.
- reviewer_name: Reviewer name if available.
- review_text: Review body.
- url: Review URL if available.
