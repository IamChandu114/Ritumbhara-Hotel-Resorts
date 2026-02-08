const data = {
  brand: "Ritumbhara Hotel & Resorts",
  sourceOfTruth: "Google Business Profile",
  contentTone: "warm, premium, nature-forward",
  primaryMarkets: ["Sariska", "Alwar", "Rajasthan", "Delhi NCR"],
  targetKeywords: [
    "Resort near Sariska",
    "Best resort in Alwar",
    "Destination wedding resort Rajasthan",
    "Luxury resort near Delhi NCR",
    "Best Food Catering Company"
  ],
  supportingTopics: [
    "Sariska tiger reserve proximity",
    "Alwar weekend getaway",
    "Rajasthan destination weddings",
    "Luxury resort amenities",
    "Corporate offsite venue",
    "Family-friendly resort",
    "On-site catering services"
  ],
  kpis: [
    { label: "Citations Tracked", value: "8", note: "Feb audit" },
    { label: "NAP Consistency", value: "83.4%", note: "Target 100%" },
    { label: "Duplicate Listings", value: "1", note: "Resolve in 14 days" },
    { label: "Review Keywords", value: "15", note: "This week" }
  ],
  agents: [
    {
      title: "Local Citations & Listings",
      items: [
        "Auto-submit listings to travel and tourism portals",
        "Track approvals and update status weekly",
        "Detect NAP inconsistencies and duplicates"
      ]
    },
    {
      title: "Review & Reputation SEO",
      items: [
        "Extract keyword phrases from reviews",
        "Generate FAQs, snippets, and schema",
        "Publish review-based GMB posts"
      ]
    },
    {
      title: "Tech SEO Health",
      items: [
        "Crawl 404s, redirects, and canonicals",
        "Validate schema and sitemap freshness",
        "Track Core Web Vitals monthly"
      ]
    }
  ],
  weeklyLoop: [
    { step: "Ingest new reviews", detail: "Google + travel directory imports" },
    { step: "Extract SEO phrases", detail: "Location, weddings, luxury, catering" },
    { step: "Update site content", detail: "FAQs, snippets, and blog insertions" },
    { step: "Push GMB posts", detail: "Top review highlights" },
    { step: "Audit citations", detail: "NAP consistency and duplicates" },
    { step: "Tech SEO check", detail: "Crawl + schema validation" }
  ],
  reviewInsights: [
    "Common phrases: peaceful stay, near Sariska, wedding functions, catering team.",
    "Sentiment drivers: hospitality, food quality, calm surroundings.",
    "Priority gap: luxury resort near Delhi NCR."
  ],
  techHealth: [
    { label: "Indexability", score: 92, note: "2 noindex tags" },
    { label: "Schema Coverage", score: 88, note: "FAQ schema pending" },
    { label: "Core Web Vitals", score: 84, note: "LCP on 3 pages" },
    { label: "Redirect Hygiene", score: 96, note: "1 redirect chain" }
  ]
};

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
};

const renderList = (id, items, className = "chip") => {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = className;
    chip.textContent = item;
    container.appendChild(chip);
  });
};

const renderKpis = () => {
  const container = document.getElementById("kpiGrid");
  if (!container) return;
  container.innerHTML = "";
  data.kpis.forEach((kpi) => {
    const card = document.createElement("div");
    card.className = "kpi-card";
    card.innerHTML = `
      <div class="kpi-value">${kpi.value}</div>
      <div class="kpi-label">${kpi.label}</div>
      <div class="kpi-label">${kpi.note}</div>
    `;
    container.appendChild(card);
  });
};

const renderAgents = () => {
  const container = document.getElementById("agentCards");
  if (!container) return;
  container.innerHTML = "";
  data.agents.forEach((agent) => {
    const card = document.createElement("div");
    card.className = "card";
    const listItems = agent.items.map((item) => `<li>${item}</li>`).join("");
    card.innerHTML = `
      <h3>${agent.title}</h3>
      <ul>${listItems}</ul>
    `;
    container.appendChild(card);
  });
};

const renderTimeline = () => {
  const container = document.getElementById("weeklyTimeline");
  if (!container) return;
  container.innerHTML = "";
  data.weeklyLoop.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "timeline-item";
    card.innerHTML = `
      <strong>Step ${index + 1}: ${item.step}</strong>
      <p>${item.detail}</p>
    `;
    container.appendChild(card);
  });
};

const renderReviewInsights = () => {
  const container = document.getElementById("reviewInsights");
  if (!container) return;
  container.innerHTML = "";
  data.reviewInsights.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    container.appendChild(p);
  });
};

const renderTechHealth = () => {
  const container = document.getElementById("techHealth");
  if (!container) return;
  container.innerHTML = "";
  data.techHealth.forEach((item) => {
    const card = document.createElement("div");
    card.className = "health-card";
    card.innerHTML = `
      <span>${item.label}</span>
      <div class="progress">
        <div class="progress-bar" style="width: ${item.score}%"></div>
      </div>
      <div>${item.score}% · ${item.note}</div>
    `;
    container.appendChild(card);
  });
};

const modal = document.getElementById("reportModal");
const modalTitle = document.getElementById("modalTitle");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalBody = document.getElementById("reportBody");
const modalClose = document.getElementById("modalClose");

const weeklyFallback = {
  summary:
    "Total reviews analyzed: 6. Average rating: 4.67. Common themes include: peaceful stay, stay near, near sariska, sariska lawns. Use the highlighted phrases to update FAQs and on-page snippets.",
  keyword_phrases: [
    "peaceful stay",
    "stay near",
    "near sariska",
    "sariska lawns",
    "lawns perfect",
    "perfect wedding",
    "wedding functions",
    "functions catering",
    "catering team",
    "team handled",
    "handled everything",
    "everything smoothly",
    "peaceful stay near",
    "stay near sariska",
    "near sariska lawns"
  ],
  snippet_candidates: [
    "Peaceful stay near Sariska",
    "The lawns were perfect for our wedding functions and the catering team handled everything smoothly",
    "We chose this as a destination wedding resort in Rajasthan and the staff were very supportive",
    "Best resort in Alwar for a weekend getaway",
    "Rooms were clean and the food was excellent",
    "Luxury vibe and calm surroundings",
    "Great option for a luxury resort near Delhi NCR when you want a quiet break",
    "Catering was outstanding and the banquet setup worked well for our corporate offsite"
  ],
  faq_items: [
    { question: "Do guests mention peaceful stay?", answer: "Peaceful stay near Sariska" },
    { question: "Do guests mention stay near?", answer: "Peaceful stay near Sariska" },
    { question: "Do guests mention near sariska?", answer: "Peaceful stay near Sariska" },
    { question: "Do guests mention sariska lawns?", answer: "Peaceful stay near Sariska" },
    { question: "Do guests mention lawns perfect?", answer: "Peaceful stay near Sariska" }
  ],
  insertion_suggestions: [
    { page: "Destination wedding resort Rajasthan", suggested_text: "Peaceful stay near Sariska" },
    {
      page: "Destination wedding resort Rajasthan",
      suggested_text: "We chose this as a destination wedding resort in Rajasthan and the staff were very supportive"
    },
    { page: "Best resort in Alwar", suggested_text: "Best resort in Alwar for a weekend getaway" },
    { page: "Luxury resort near Delhi NCR", suggested_text: "Luxury vibe and calm surroundings" },
    { page: "Best Food Catering Company", suggested_text: "Catering was outstanding and the banquet setup worked well for our corporate offsite" },
    { page: "Resort near Sariska", suggested_text: "Helpful staff, peaceful gardens, and easy access to Sariska tiger reserve" }
  ]
};

const reports = {
  weekly: {
    title: "Weekly Review Insights",
    eyebrow: "Review SEO Loop",
    type: "json",
    path: "../reports/weekly_review_insights.json",
    fallback: weeklyFallback
  },
  citation: {
    title: "Monthly Citation Health",
    eyebrow: "Off-Page Authority",
    type: "md",
    path: "../reports/monthly_citation_health_report_2026-02.md",
    fallback:
      "# Monthly Citation Health Report\n\nReport Month: February 2026\nPrepared By: SEO Automation System\n\nSummary Metrics\n- Total citations tracked: 8\n- Approved listings: 2\n- Pending approvals: 4\n- NAP consistency percent: 83.4%\n- Duplicates detected: 1\n\nTop Wins\n- Consistent NAP usage on priority directories\n- Approval progress tracked weekly\n- Duplicate detection active\n\nTop Issues\n- Fill missing directory submissions\n- Resolve pending approvals\n- Fix any NAP mismatches"
  },
  tech: {
    title: "Monthly Tech SEO Health",
    eyebrow: "Technical SEO",
    type: "md",
    path: "../reports/tech_seo_health_report_2026-02.md",
    fallback:
      "# Monthly Tech SEO Health Report\n\nReport Month: February 2026\nPrepared By: SEO Automation System\n\nSummary Metrics\n- Pages crawled: 6\n- 4xx errors: 1\n- 5xx errors: 0\n- Redirect chains: 0\n- Canonical issues: 1\n- Schema errors: 2\n\nPerformance Snapshot\n- LCP: 3.02\n- INP: 192.5\n- CLS: 0.08"
  }
};

const openModal = () => {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const markdownToHtml = (mdText) => {
  const lines = mdText.split("\n");
  let html = "";
  let listOpen = false;
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (listOpen) {
        html += "</ul>";
        listOpen = false;
      }
      return;
    }
    if (trimmed.startsWith("# ")) {
      if (listOpen) {
        html += "</ul>";
        listOpen = false;
      }
      html += `<h4>${trimmed.replace("# ", "")}</h4>`;
      return;
    }
    if (trimmed.startsWith("## ")) {
      if (listOpen) {
        html += "</ul>";
        listOpen = false;
      }
      html += `<h5>${trimmed.replace("## ", "")}</h5>`;
      return;
    }
    if (trimmed.startsWith("- ")) {
      if (!listOpen) {
        html += "<ul class=\"report-list\">";
        listOpen = true;
      }
      html += `<li>${trimmed.replace("- ", "")}</li>`;
      return;
    }
    if (listOpen) {
      html += "</ul>";
      listOpen = false;
    }
    html += `<p>${trimmed}</p>`;
  });
  if (listOpen) {
    html += "</ul>";
  }
  return html;
};

const renderWeeklyReport = (payload) => {
  const dataSet = payload || weeklyFallback;
  const cards = [];

  cards.push(`
    <div class="report-card">
      <h4>Summary</h4>
      <p>${dataSet.summary}</p>
    </div>
  `);

  cards.push(`
    <div class="report-card">
      <h4>Keyword Phrases</h4>
      <div class="chip-group">
        ${dataSet.keyword_phrases.map((item) => `<span class="chip">${item}</span>`).join("")}
      </div>
    </div>
  `);

  cards.push(`
    <div class="report-card">
      <h4>Snippet Candidates</h4>
      <ul class="report-list">
        ${dataSet.snippet_candidates.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `);

  cards.push(`
    <div class="report-card">
      <h4>FAQ Ideas</h4>
      <ul class="report-list">
        ${dataSet.faq_items.map((item) => `<li><strong>${item.question}</strong> ${item.answer}</li>`).join("")}
      </ul>
    </div>
  `);

  cards.push(`
    <div class="report-card">
      <h4>Insertion Suggestions</h4>
      <ul class="report-list">
        ${dataSet.insertion_suggestions
          .map((item) => `<li><strong>${item.page}</strong> ${item.suggested_text}</li>`)
          .join("")}
      </ul>
    </div>
  `);

  return cards.join("");
};

const renderMarkdownReport = (mdText) => `
  <div class="report-card">
    ${markdownToHtml(mdText)}
  </div>
`;

const loadReport = async (key) => {
  const report = reports[key];
  if (!report || !modalBody) return;

  modalTitle.textContent = report.title;
  modalEyebrow.textContent = report.eyebrow;
  modalBody.innerHTML = "<div class=\"report-card\"><p>Loading report...</p></div>";
  openModal();

  if (report.type === "json") {
    try {
      const response = await fetch(report.path);
      if (!response.ok) throw new Error("Fetch failed");
      const json = await response.json();
      modalBody.innerHTML = renderWeeklyReport(json);
      return;
    } catch (err) {
      modalBody.innerHTML = renderWeeklyReport(report.fallback);
      return;
    }
  }

  try {
    const response = await fetch(report.path);
    if (!response.ok) throw new Error("Fetch failed");
    const text = await response.text();
    modalBody.innerHTML = renderMarkdownReport(text);
  } catch (err) {
    modalBody.innerHTML = renderMarkdownReport(report.fallback);
  }
};

const loadMonthlyReports = async () => {
  modalTitle.textContent = "Monthly Reports";
  modalEyebrow.textContent = "Off-Page + Tech SEO";
  modalBody.innerHTML = "<div class=\"report-card\"><p>Loading reports...</p></div>";
  openModal();

  const citation = reports.citation;
  const tech = reports.tech;

  const sections = [];

  try {
    const response = await fetch(citation.path);
    const text = response.ok ? await response.text() : citation.fallback;
    sections.push(renderMarkdownReport(text));
  } catch (err) {
    sections.push(renderMarkdownReport(citation.fallback));
  }

  try {
    const response = await fetch(tech.path);
    const text = response.ok ? await response.text() : tech.fallback;
    sections.push(renderMarkdownReport(text));
  } catch (err) {
    sections.push(renderMarkdownReport(tech.fallback));
  }

  modalBody.innerHTML = sections.join("");
};

const bindButtons = () => {
  const weekly = document.getElementById("btnWeekly");
  if (weekly) {
    weekly.addEventListener("click", () => loadReport("weekly"));
  }

  const monthly = document.getElementById("btnMonthly");
  if (monthly) {
    monthly.addEventListener("click", () => loadMonthlyReports());
  }

  const exportBtn = document.getElementById("btnExport");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => loadReport("tech"));
  }

  const gmb = document.getElementById("btnGmb");
  if (gmb) {
    gmb.addEventListener("click", () => loadReport("weekly"));
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
};

const storageAvailable = (() => {
  try {
    const testKey = "__rh_test__";
    window.localStorage.setItem(testKey, "ok");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
})();

const storage = storageAvailable ? window.localStorage : null;

const readStorage = (key, fallback) => {
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
};

const state = {
  reviews: readStorage("rh_reviews", []),
  citations: readStorage("rh_citations", []),
  crawls: readStorage("rh_crawls", [])
};

const updateCounts = () => {
  setText("reviewCount", String(state.reviews.length));
  setText("citationCount", String(state.citations.length));
  setText("crawlCount", String(state.crawls.length));
};

const showStatus = (id, message, tone) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.classList.remove("success", "warn");
  if (tone) el.classList.add(tone);
};

const truncate = (text, length = 90) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return `${text.slice(0, length - 3)}...`;
};

const refreshReviewInsights = () => {
  if (!state.reviews.length) return;
  const latest = state.reviews.slice(-3).reverse();
  data.reviewInsights = [
    `Live entries saved: ${state.reviews.length}.`,
    `Latest review: ${truncate(latest[0].review_text)}`,
    latest[1] ? `Previous review: ${truncate(latest[1].review_text)}` : "Previous review: not available yet."
  ];
  renderReviewInsights();
};

const csvEscape = (value) => {
  const text = value === null || value === undefined ? "" : String(value);
  if (text.includes("\"") || text.includes(",") || text.includes("\n")) {
    return `"${text.replace(/\"/g, "\"\"")}"`;
  }
  return text;
};

const buildCsv = (headers, rows) => {
  const lines = [headers.join(",")];
  rows.forEach((row) => {
    lines.push(headers.map((key) => csvEscape(row[key])).join(","));
  });
  return lines.join("\n");
};

const downloadCsv = (filename, headers, rows) => {
  const csv = buildCsv(headers, rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

const bindForms = () => {
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(reviewForm);
      const entry = {
        source: formData.get("source") || "",
        review_id: formData.get("review_id") || "",
        review_date: formData.get("review_date") || "",
        rating: formData.get("rating") || "",
        reviewer_name: formData.get("reviewer_name") || "Anonymous",
        review_text: formData.get("review_text") || "",
        url: formData.get("url") || ""
      };

      if (!entry.review_text.trim()) {
        showStatus("reviewStatus", "Review text is required.", "warn");
        return;
      }

      state.reviews.push(entry);
      writeStorage("rh_reviews", state.reviews);
      updateCounts();
      refreshReviewInsights();
      showStatus(
        "reviewStatus",
        storage ? "Review saved locally." : "Review saved for this session.",
        "success"
      );
      reviewForm.reset();
    });
  }

  const citationForm = document.getElementById("citationForm");
  if (citationForm) {
    citationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(citationForm);
      const nameMatch = formData.get("name_match") === "true";
      const addressMatch = formData.get("address_match") === "true";
      const phoneMatch = formData.get("phone_match") === "true";
      const matchScore = ((nameMatch + addressMatch + phoneMatch) / 3).toFixed(2);
      const today = new Date().toISOString().slice(0, 10);
      const entry = {
        listing_name: data.brand,
        directory_category: formData.get("directory_category") || "",
        directory_name: formData.get("directory_name") || "",
        listing_url: formData.get("listing_url") || "",
        status: formData.get("status") || "",
        submit_date: "",
        approval_date: "",
        last_checked: today,
        nap_match_score: matchScore,
        name_match: String(nameMatch),
        address_match: String(addressMatch),
        phone_match: String(phoneMatch),
        duplicate_of: "",
        login_email: formData.get("login_email") || "",
        notes: formData.get("notes") || ""
      };

      if (!entry.directory_name.trim()) {
        showStatus("citationStatus", "Directory name is required.", "warn");
        return;
      }

      state.citations.push(entry);
      writeStorage("rh_citations", state.citations);
      updateCounts();
      showStatus(
        "citationStatus",
        storage ? "Citation saved locally." : "Citation saved for this session.",
        "success"
      );
      citationForm.reset();
    });
  }

  const crawlForm = document.getElementById("crawlForm");
  if (crawlForm) {
    crawlForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(crawlForm);
      const entry = {
        url: formData.get("url") || "",
        status: formData.get("status") || "",
        canonical: formData.get("canonical") || "",
        indexable: formData.get("indexable") || "",
        redirect_chain_length: formData.get("redirect_chain_length") || "0",
        has_schema: formData.get("has_schema") || "",
        lcp: formData.get("lcp") || "",
        inp: formData.get("inp") || "",
        cls: formData.get("cls") || "",
        notes: formData.get("notes") || ""
      };

      if (!entry.url.trim()) {
        showStatus("crawlStatus", "URL is required.", "warn");
        return;
      }

      state.crawls.push(entry);
      writeStorage("rh_crawls", state.crawls);
      updateCounts();
      showStatus(
        "crawlStatus",
        storage ? "Crawl row saved locally." : "Crawl row saved for this session.",
        "success"
      );
      crawlForm.reset();
    });
  }

  const downloadReviews = document.getElementById("downloadReviews");
  if (downloadReviews) {
    downloadReviews.addEventListener("click", () => {
      const headers = ["source", "review_id", "review_date", "rating", "reviewer_name", "review_text", "url"];
      downloadCsv("review_ingest.csv", headers, state.reviews);
    });
  }

  const downloadCitations = document.getElementById("downloadCitations");
  if (downloadCitations) {
    downloadCitations.addEventListener("click", () => {
      const headers = [
        "listing_name",
        "directory_category",
        "directory_name",
        "listing_url",
        "status",
        "submit_date",
        "approval_date",
        "last_checked",
        "nap_match_score",
        "name_match",
        "address_match",
        "phone_match",
        "duplicate_of",
        "login_email",
        "notes"
      ];
      downloadCsv("citation_tracker.csv", headers, state.citations);
    });
  }

  const downloadCrawls = document.getElementById("downloadCrawls");
  if (downloadCrawls) {
    downloadCrawls.addEventListener("click", () => {
      const headers = [
        "url",
        "status",
        "canonical",
        "indexable",
        "redirect_chain_length",
        "has_schema",
        "lcp",
        "inp",
        "cls",
        "notes"
      ];
      downloadCsv("tech_seo_crawl.csv", headers, state.crawls);
    });
  }
};

const boot = () => {
  setText("sourceOfTruth", data.sourceOfTruth);
  setText("contentTone", data.contentTone);
  setText("primaryMarkets", data.primaryMarkets.join(" · "));
  renderList("keywordChips", data.targetKeywords);
  renderList("supportingChips", data.supportingTopics, "chip");
  renderKpis();
  renderAgents();
  renderTimeline();
  renderReviewInsights();
  renderTechHealth();
  bindButtons();
  bindForms();
  updateCounts();
  refreshReviewInsights();
};

boot();
