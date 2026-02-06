/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Theme toggle (persisted) */
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";

  if (next) document.documentElement.setAttribute("data-theme", next);
  else document.documentElement.removeAttribute("data-theme");

  localStorage.setItem("theme", next || "");
});

/* Mobile menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => navLinks?.classList.toggle("open"));

navLinks?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* Skills search + filter */
const search = document.getElementById("skillSearch");
const skillCards = Array.from(document.querySelectorAll(".skill"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

let activeFilter = "all";

function applySkillsFilter() {
  const q = (search?.value || "").toLowerCase().trim();

  skillCards.forEach((card) => {
    const group = card.getAttribute("data-group");
    const text = card.innerText.toLowerCase();

    const groupOk = activeFilter === "all" || group === activeFilter;
    const textOk = !q || text.includes(q);

    card.style.display = groupOk && textOk ? "block" : "none";
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.getAttribute("data-filter") || "all";
    applySkillsFilter();
  });
});

search?.addEventListener("input", applySkillsFilter);

/* Project modals */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

/* IMPORTANT:
   Your HTML has buttons with data-open="p1"... "p4".
   This cases object must include p4 for the new dashboard project.
*/
const cases = {
  p1: {
    title: "Case Study — Weather + Production Intelligence",
    body: `
      <p><strong>Decision goal:</strong> Connect weather variability to production outcomes to support proactive planning.</p>
      <ul>
        <li>Integrated weather and production datasets into a consistent reporting model.</li>
        <li>Validated definitions and built interactive exploration to isolate drivers (temperature/rainfall effects).</li>
        <li>Designed views for both strategy and operational follow-up.</li>
      </ul>
      <p><strong>Outcome:</strong> Stronger planning discussions grounded in measured trends and clearer risk visibility.</p>
    `
  },
  p2: {
    title: "Case Study — Cold Room Temperature Curve Reporting",
    body: `
      <p><strong>Decision goal:</strong> Protect quality and compliance by catching temperature drift early.</p>
      <ul>
        <li>Built daily temperature curve monitoring with out-of-range flags.</li>
        <li>Added context to separate brief anomalies from persistent equipment problems.</li>
        <li>Optimized layout for fast daily operational checks.</li>
      </ul>
      <p><strong>Outcome:</strong> Earlier intervention on cold room issues and reduced spoilage risk.</p>
    `
  },
  p3: {
    title: "Case Study — Real-Time Threat Monitoring & Automation",
    body: `
      <p><strong>Decision goal:</strong> Convert security telemetry into actionable alerts and visibility.</p>
      <ul>
        <li>Implemented ingestion and processing workflows to detect anomalies.</li>
        <li>Supported dashboards for triage and operational decision-making.</li>
        <li>Automated deployment and optimized performance for stable operations.</li>
      </ul>
      <p><strong>Outcome:</strong> Less manual monitoring and improved operational efficiency through automation.</p>
    `
  },
  p4: {
    title: "Case Study — Power BI Transactions Dashboard (Uzbekistan, 2024–2025)",
    body: `
      <p><strong>Situation:</strong> I wanted a real-world dataset to strengthen my skills in data cleaning, modeling, and visualization.</p>
      <p><strong>Task:</strong> Build an interactive Power BI dashboard using Uzbekistan transaction data (2024–2025) with clear KPIs, slicers, and insight-focused visuals.</p>
      <p><strong>Action:</strong></p>
      <ul>
        <li><strong>Data preparation:</strong> Cleaned and transformed raw CSV data to ensure consistent fields and usable data types.</li>
        <li><strong>DAX measures:</strong> Created KPIs for <em>Total Amount</em>, <em>Total Transactions</em>, and <em>Average Amount</em>.</li>
        <li><strong>Dashboard design:</strong> Built an interactive report with slicers for <em>Region</em>, <em>Year</em>, and <em>Transaction Type</em>.</li>
        <li><strong>Data storytelling:</strong> Visualized monthly transaction trends, region-wise comparisons, transaction-type distribution, and top customers.</li>
      </ul>
      <p><strong>Result:</strong> Produced a decision-ready dashboard highlighting <em>Total Amount (5M)</em>, <em>Total Transactions (7)</em>, and <em>Average Amount (707.14K)</em>—improving my ability to translate raw data into actionable insights and communicate findings effectively.</p>
    `
  }
};

function openModal(key) {
  const cs = cases[key];
  if (!cs || !modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = cs.title;
  modalBody.innerHTML = cs.body;
  modal.classList.add("open");
}

function closeModal() {
  modal?.classList.remove("open");
}

document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.getAttribute("data-open")));
});

closeModalBtn?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});