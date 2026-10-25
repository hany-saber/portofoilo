/**
 * HANY MAHROUS — GRC & CYBERSECURITY ADVISORY
 * Interactive Client Logic & Assessment Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initPerspectiveToggle();
  initFrameworkMatrix();
  initAssessmentTool();
  initContactForm();
  initBackToTop();
  initMetricCounters();
});

/* ==========================================================================
   THEME TOGGLE SYSTEM (OBSIDIAN DARK / EXECUTIVE LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('hm_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hm_theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Obsidian Executive Dark' : 'Daylight Executive'} theme`);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ==========================================================================
   NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile menu on clicking any navigation link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close mobile menu on clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('is-open') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Reset menu state on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1040 && navLinks.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   THE TECHNICAL EDGE: DUAL PERSPECTIVE TOGGLE
   ========================================================================== */
const edgeData = {
  executive: [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      title: "Regulatory & Audit Defensibility",
      paper: "Checklist compliance leaves hidden toxic exposures that fail regulatory scrutiny during breach investigations.",
      hany: "CISA-grade control verification creates air-tight audit artifacts that satisfy global regulators and tier-1 external audit firms."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
      title: "Business Continuity & Uptime",
      paper: "Theoretical BCP documents provide zero assurance that enterprise servers or databases will recover from ransomware.",
      hany: "20+ years of infrastructure engineering guarantees backup immutability, Active Directory disaster recovery, and 99.9% uptime SLA."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      title: "Board & Stakeholder Assurance",
      paper: "Technical security jargon confuses executive leadership and clouds risk exposure, stalling capital allocation.",
      hany: "TOT-certified communication translates complex vulnerabilities into quantified business risk scores and clear strategic roadmaps."
    }
  ],
  technical: [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      title: "Active Directory & Identity Hardening",
      paper: "Auditors only check if an Access Control Policy PDF exists on SharePoint.",
      hany: "Directly audits Group Policy Objects (GPOs), Kerberoasting vulnerabilities, AdminSDHolder permissions, and tiered administration."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
      title: "Vulnerability Management & Exploitation",
      paper: "Standard consultants hand over automated Nessus scans containing hundreds of uncontextualized false positives.",
      hany: "Leverages hands-on offensive security (OopsSec / OSCP track) to test real exploit chains, prioritizing true operational risk."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: "Security Automation & Telemetry",
      paper: "Manual sample checking once every 12 months with blind spots across modern operating systems.",
      hany: "Custom Bash & Python automation for reconnaissance, system hardening validation, and continuous telemetry alignment."
    }
  ]
};

function initPerspectiveToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-option');
  const cardsContainer = document.getElementById('edge-cards-container');
  if (!toggleBtns.length || !cardsContainer) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const perspective = btn.dataset.perspective;
      renderEdgeCards(perspective, cardsContainer);
    });
  });

  // Initial render
  renderEdgeCards('executive', cardsContainer);
}

function renderEdgeCards(perspective, container) {
  const items = edgeData[perspective] || edgeData.executive;
  container.innerHTML = items.map(item => `
    <div class="edge-card">
      <div class="edge-card-icon">${item.icon}</div>
      <h3 class="edge-card-title">${item.title}</h3>
      <div class="edge-card-comparison">
        <div class="comp-box paper">
          <strong>Conventional "Paper" Auditor</strong>
          <p>${item.paper}</p>
        </div>
        <div class="comp-box hany">
          <strong>Hany's Technical GRC Approach</strong>
          <p>${item.hany}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   INTERACTIVE FRAMEWORK MATRIX
   ========================================================================== */
const frameworkData = {
  iso27001: {
    code: "ISO/IEC 27001:2022",
    title: "Information Security Management System (ISMS)",
    description: "End-to-end design, implementation, and audit readiness for ISO 27001:2022. Hany bridges clauses 4 through 10 with the 93 revised Annex A controls across Organizational, People, Physical, and Technological themes.",
    deliverables: [
      "Statement of Applicability (SoA) tailored to technical infrastructure",
      "Annex A Technical Control Validation (GPO, Network, Endpoint, Cryptography)",
      "Information Security Risk Assessment & Treatment Plan (RATP)",
      "Comprehensive Internal Audit Report prior to Stage 1 & Stage 2 certification"
    ],
    stats: [
      { label: "Annex A Controls Audited", value: "93 Controls" },
      { label: "Target Certification Success", value: "100% First-Pass" },
      { label: "Typical Gap Remediation Timeline", value: "6 - 12 Weeks" }
    ]
  },
  nist: {
    code: "NIST CSF 2.0",
    title: "Cybersecurity Framework & Implementation Tiers",
    description: "Aligning enterprise posture against the updated NIST Cybersecurity Framework 2.0. Covering all six core functions: GOVERN (GV), IDENTIFY (ID), PROTECT (PR), DETECT (DE), RESPOND (RS), and RECOVER (RC).",
    deliverables: [
      "Current-State vs Target-State Profile Gap Analysis",
      "NIST CSF Implementation Roadmap with priority risk weighting",
      "Active Directory & Network Segmentation control mapping",
      "Executive Board Dashboard tracking implementation maturity tier (Tier 1 to Tier 4)"
    ],
    stats: [
      { label: "Framework Functions", value: "6 Core Functions" },
      { label: "Technical Categories Covered", value: "22 Categories" },
      { label: "Maturity Uplift Average", value: "+2.2 Tiers" }
    ]
  },
  cisa: {
    code: "ISACA CISA®",
    title: "IT General Controls (ITGC) & Systems Audit",
    description: "Comprehensive information systems audit grounded in ISACA's global CISA methodology. Auditing IT governance, system acquisition, implementation, operations, and asset protection.",
    deliverables: [
      "Logical Access & Identity Management Audit (AD, MFA, Privileged Accounts)",
      "Change Management & SDLC Control Defensibility",
      "Data Center & Backup Reliability (RTO/RPO Verification)",
      "Formal Audit Findings Log with Root-Cause Remediation Protocols"
    ],
    stats: [
      { label: "ISACA Domains Evaluated", value: "All 5 Domains" },
      { label: "Internal Control Confidence", value: "Defensible" },
      { label: "Audit Finding Reduction", value: "Up to 85%" }
    ]
  },
  soc2: {
    code: "AICPA SOC 2 Type II",
    title: "Trust Services Criteria Readiness & Continuous Monitoring",
    description: "Preparing SaaS and enterprise service organizations for rigorous SOC 2 Type I & Type II examinations. Specializing in Security, Availability, and Confidentiality criteria.",
    deliverables: [
      "SOC 2 Readiness Gap Assessment against AICPA TSC",
      "Technical Evidence Collection System for Automated Compliance Platforms",
      "Vendor Risk Management & Third-Party Oversight Process",
      "Incident Response Simulation & Disaster Recovery Testing Evidence"
    ],
    stats: [
      { label: "Trust Criteria Focus", value: "Security & Availability" },
      { label: "Observation Window Prep", value: "3 - 6 Months" },
      { label: "Auditor Inquiry Defensibility", value: "100%" }
    ]
  },
  pci: {
    code: "PCI-DSS v4.0",
    title: "Payment Card Industry Data Security Standard",
    description: "Architectural scoping, network segmentation testing, and 12-requirement verification to secure Cardholder Data Environments (CDE) and minimize audit scope.",
    deliverables: [
      "CDE Scoping Analysis & Segmentation Isolation Verification",
      "Access Control, System Hardening & Patch Verification (Req. 2, 6, 7, 8)",
      "Custom Automation Scripts to detect unauthorized ports and services",
      "Self-Assessment Questionnaire (SAQ-D) & RoC Preparation"
    ],
    stats: [
      { label: "Standard Version", value: "v4.0 (Latest)" },
      { label: "Scope Reduction Avg", value: "40% - 65%" },
      { label: "Requirements Audited", value: "12 Primary Goals" }
    ]
  }
};

function initFrameworkMatrix() {
  const tabs = document.querySelectorAll('.framework-tab-btn');
  const cardContainer = document.getElementById('framework-details-container');
  if (!tabs.length || !cardContainer) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const fwKey = tab.dataset.fw;
      renderFrameworkDetails(fwKey, cardContainer);
    });
  });

  // Initial render
  renderFrameworkDetails('iso27001', cardContainer);
}

function renderFrameworkDetails(key, container) {
  const data = frameworkData[key] || frameworkData.iso27001;
  container.innerHTML = `
    <div class="framework-content-grid">
      <div>
        <div class="fw-meta-header">
          <span class="fw-code-badge">${data.code}</span>
        </div>
        <h3 class="fw-title">${data.title}</h3>
        <p class="fw-description">${data.description}</p>
        <ul class="fw-features-list">
          ${data.deliverables.map(deliv => `
            <li class="fw-feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${deliv}</span>
            </li>
          `).join('')}
        </ul>
        <a href="#contact" class="btn btn-primary btn-sm">Engage for ${data.code} Advisory</a>
      </div>
      <div class="fw-stats-box">
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 8px;">Advisory Parameters</h4>
        ${data.stats.map(s => `
          <div class="fw-stat-row">
            <span class="fw-stat-label">${s.label}</span>
            <span class="fw-stat-value">${s.value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   INTERACTIVE GRC MATURITY & RISK SIMULATOR
   ========================================================================== */
const assessmentQuestions = [
  {
    id: "gov",
    title: "1. Information Security Governance & Policies",
    options: [
      { text: "Ad-hoc policies; rarely updated or communicated across teams", score: 20 },
      { text: "Documented security policies exist, but lack annual review or enforcement", score: 50 },
      { text: "Approved policies aligned with ISO 27001/NIST, reviewed annually with management sign-off", score: 80 },
      { text: "Comprehensive ISMS integrated with executive KPIs, automated compliance tracking, and continuous audit", score: 100 }
    ]
  },
  {
    id: "iam",
    title: "2. Identity & Access Management (AD / MFA / PAM)",
    options: [
      { text: "Shared credentials, local administrator accounts in widespread use, no MFA on critical assets", score: 15 },
      { text: "MFA enabled only for email/remote access; Active Directory permissions rarely audited", score: 45 },
      { text: "Universal MFA, role-based access control (RBAC), and regular user access recertifications", score: 80 },
      { text: "Zero-Trust tiered administration, Privileged Access Management (PAM), automated joiner/mover/leaver workflows", score: 100 }
    ]
  },
  {
    id: "patch",
    title: "3. Vulnerability & Patch Management",
    options: [
      { text: "Patching is performed manually only after outages or visible security alerts", score: 20 },
      { text: "Quarterly automated vulnerability scans; patches deployed within 60-90 days", score: 50 },
      { text: "Monthly risk-ranked vulnerability scans; critical CVEs remediated within 14-30 days", score: 85 },
      { text: "Continuous vulnerability management, active exploit chain testing, SLA of <7 days for critical patches", score: 100 }
    ]
  },
  {
    id: "bcp",
    title: "4. Incident Response & Disaster Recovery (BCP)",
    options: [
      { text: "No formal incident response plan; backups untested and co-located on primary network", score: 15 },
      { text: "Basic IR plan documented; backups taken regularly but restoration is rarely drilled", score: 50 },
      { text: "Tested IR playbooks, immutable offline/cloud backups, annual tabletop drill with stakeholders", score: 85 },
      { text: "Comprehensive BCP/DR with verified RTO/RPO < 4 hours, isolated recovery environment, board reporting", score: 100 }
    ]
  },
  {
    id: "tprm",
    title: "5. Third-Party & Vendor Risk Management",
    options: [
      { text: "Vendors are onboarded without security questionnaires or contractual security clauses", score: 20 },
      { text: "Vendors complete basic questionnaires upon signing, but are not monitored thereafter", score: 50 },
      { text: "Formal vendor tiering based on data sensitivity, annual review of SOC 2 / ISO certificates", score: 80 },
      { text: "Continuous vendor risk assessment, technical telemetry verification, and contractual right-to-audit", score: 100 }
    ]
  }
];

let currentScores = {
  gov: 50,
  iam: 45,
  patch: 50,
  bcp: 50,
  tprm: 50
};

function initAssessmentTool() {
  const container = document.getElementById('assessment-questions-container');
  if (!container) return;

  container.innerHTML = assessmentQuestions.map(q => `
    <div class="question-card" data-qid="${q.id}">
      <div class="question-header">
        <h4 class="question-title">${q.title}</h4>
        <span class="question-score-pill" id="pill-${q.id}">${currentScores[q.id]}%</span>
      </div>
      <div class="options-group">
        ${q.options.map((opt, idx) => `
          <label class="option-label ${idx === 1 ? 'selected' : ''}">
            <input type="radio" name="${q.id}" value="${opt.score}" class="option-radio" ${idx === 1 ? 'checked' : ''}>
            <span>${opt.text}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Attach radio listeners
  document.querySelectorAll('.option-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const qid = e.target.name;
      const score = parseInt(e.target.value, 10);
      currentScores[qid] = score;

      // Update UI selection
      const card = document.querySelector(`.question-card[data-qid="${qid}"]`);
      card.querySelectorAll('.option-label').forEach(lbl => lbl.classList.remove('selected'));
      e.target.closest('.option-label').classList.add('selected');

      // Update pill
      const pill = document.getElementById(`pill-${qid}`);
      if (pill) pill.textContent = `${score}%`;

      calculateOverallScore();
    });
  });

  // Initial calculation
  calculateOverallScore();

  // Export Summary Button
  const exportBtn = document.getElementById('export-assessment-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportAssessmentSummary);
  }
}

function calculateOverallScore() {
  const values = Object.values(currentScores);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

  const gauge = document.getElementById('assessment-gauge');
  const scoreDisplay = document.getElementById('overall-score-num');
  const tierBadge = document.getElementById('maturity-tier-badge');
  const summaryText = document.getElementById('results-summary-text');

  if (gauge) {
    gauge.style.setProperty('--score-pct', avg);
  }

  if (scoreDisplay) {
    scoreDisplay.innerHTML = `${avg}<span>/100</span>`;
  }

  // Determine Tier
  let tierName = "Developing (Tier 2)";
  let tierClass = "tier-developing";
  let summary = "Your organization possesses core baseline controls, but significant gaps in Active Directory hardening, audit trails, and policy enforcement leave you exposed to compliance penalties.";

  if (avg < 40) {
    tierName = "Foundational / High Risk (Tier 1)";
    tierClass = "tier-foundational";
    summary = "High audit failure and breach vulnerability risk. Critical absence of technical access controls, formal GRC frameworks, and immutable disaster recovery mechanisms.";
  } else if (avg >= 75 && avg < 90) {
    tierName = "Mature & Defensible (Tier 3)";
    tierClass = "tier-mature";
    summary = "Strong security and compliance posture. Meets baseline ISO 27001 / SOC 2 requirements with robust access governance and regular vulnerability cadence.";
  } else if (avg >= 90) {
    tierName = "Optimized & Resilient (Tier 4)";
    tierClass = "tier-optimized";
    summary = "Premier enterprise governance posture with automated telemetry, CISA-ready ITGC controls, and tested resilience against advanced adversaries.";
  }

  if (tierBadge) {
    tierBadge.className = `maturity-tier-badge ${tierClass}`;
    tierBadge.textContent = tierName;
  }

  if (summaryText) {
    summaryText.textContent = summary;
  }

  // Update Breakdown list
  const breakdownContainer = document.getElementById('results-breakdown-list');
  if (breakdownContainer) {
    breakdownContainer.innerHTML = `
      <li class="breakdown-row">
        <span class="breakdown-name">Governance & Policy:</span>
        <span class="breakdown-status" style="color: ${getScoreColor(currentScores.gov)}">${currentScores.gov}%</span>
      </li>
      <li class="breakdown-row">
        <span class="breakdown-name">Identity & Access (AD):</span>
        <span class="breakdown-status" style="color: ${getScoreColor(currentScores.iam)}">${currentScores.iam}%</span>
      </li>
      <li class="breakdown-row">
        <span class="breakdown-name">Vulnerability & Patch:</span>
        <span class="breakdown-status" style="color: ${getScoreColor(currentScores.patch)}">${currentScores.patch}%</span>
      </li>
      <li class="breakdown-row">
        <span class="breakdown-name">Incident & BCP/DR:</span>
        <span class="breakdown-status" style="color: ${getScoreColor(currentScores.bcp)}">${currentScores.bcp}%</span>
      </li>
      <li class="breakdown-row">
        <span class="breakdown-name">Third-Party Risk:</span>
        <span class="breakdown-status" style="color: ${getScoreColor(currentScores.tprm)}">${currentScores.tprm}%</span>
      </li>
    `;
  }
}

function getScoreColor(score) {
  if (score < 40) return 'var(--accent-crimson)';
  if (score < 75) return 'var(--accent-gold)';
  return 'var(--accent-emerald)';
}

function exportAssessmentSummary() {
  const avg = Math.round(Object.values(currentScores).reduce((a, b) => a + b, 0) / 5);
  const text = `=== EXECUTIVE GRC AUDIT SELF-ASSESSMENT ===\nConsultant: Hany Mahrous (ISACA CISA, CompTIA Security+)\nOverall Score: ${avg}/100\n- Governance & Policies: ${currentScores.gov}%\n- Identity & Access (AD): ${currentScores.iam}%\n- Vulnerability Management: ${currentScores.patch}%\n- Incident Response & BCP: ${currentScores.bcp}%\n- Third-Party Risk: ${currentScores.tprm}%\n\nSchedule a remediation session with Hany: hany.mahrous.k@gmail.com`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("Audit summary copied to clipboard! Ready to paste into email or report.");
  }).catch(() => {
    alert(text);
  });
}

/* ==========================================================================
   CONSULTATION FORM DISPATCH
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const org = document.getElementById('form-org').value.trim();
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email) {
      showToast("Please provide your name and email address.");
      return;
    }

    const subject = encodeURIComponent(`Executive GRC Inquiry: ${service} - ${name} (${org || 'Individual'})`);
    const body = encodeURIComponent(`Hello Hany,\n\nI would like to inquire about your advisory and audit services.\n\nName: ${name}\nOrganization: ${org || 'Not specified'}\nEmail: ${email}\nRequested Scope: ${service}\n\nProject Overview:\n${message}\n\nLooking forward to speaking with you.`);

    // Open user's email client
    window.location.href = `mailto:hany.mahrous.k@gmail.com?subject=${subject}&body=${body}`;

    showToast("Opening email client to dispatch consultation request to Hany Mahrous.");
  });
}

/* ==========================================================================
   BACK TO TOP & SCROLL INDICATOR
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   METRIC COUNTER ANIMATIONS
   ========================================================================== */
function initMetricCounters() {
  const metrics = document.querySelectorAll('.metric-number[data-target]');
  if (!metrics.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, target, 1500, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  metrics.forEach(m => observer.observe(m));
}

function animateValue(obj, start, end, duration, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeProgress * (end - start) + start);
    obj.innerHTML = `${currentVal}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   GLOBAL TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-emerald)"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
