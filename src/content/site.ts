/**
 * Single source of truth for every word on the landing page.
 *
 * Extracted verbatim from docs/reference/source.html. Sections are listed in
 * the exact order they appear in the source. Do not reword, re-order, fix
 * spelling or change capitalisation here without sign-off — see
 * docs/knowledge-base.md for the reasoning and the known copy notes.
 */

export const meta = {
  lang: "en-GB",
  title:
    "Sterilised Air Solutions | Zero Capex IoT Air Sterilisation for UK Care Homes",
} as const;

// 1. Header
export const header = {
  logo: { lead: "Sterilised Air ", accent: "Solutions" },
  badge: "Fully Managed Service 24/7/365",
} as const;

// 2. Hero
export const hero = {
  // Rendered with a line break between the two lines in the source.
  headingLines: [
    "Zero Capex IoT Air Sterilisation",
    "For the UK Care Home Market",
  ],
  subheading:
    "Transforming clinical safety, proving financial returns, and automating compliance without upfront capital expenditure.",
  // Each tagline links to the part of the page that backs it up.
  taglines: [
    { text: "Medical Grade Log 6", href: "#sterilisation" },
    { text: "AI Predictive Analysis", href: "#predictive-ai" },
    { text: "CQC Reporting Ready", href: "#cqc-compliance" },
  ],
} as const;

// 3. The Solution Ecosystem
export const ecosystem = {
  title: "The Solution Ecosystem",
  cards: [
    {
      id: "sterilisation",
      title: "ILimex Sterilisation",
      body: "Delivering Medical Grade Log 6 sterilised air independently validated by Ulster University. Destroys airborne pathogens to break the cycle of cross-infection completely.",
    },
    {
      id: "monitoring",
      title: "Kaiterra Monitoring",
      body: "Continuous Indoor Air Quality monitoring linked directly to clear, user-friendly LED displays. Provides real-time status updates using universal visual indicators.",
      // Red / Amber / Green status dots. Labels were tooltip (title) text.
      rag: [
        { status: "red", label: "Action Required" },
        { status: "amber", label: "Cautionary Level" },
        { status: "green", label: "Optimal Air Quality" },
      ],
    },
    {
      id: "predictive-ai",
      title: "Predictive AI Layer",
      body: "Advanced machine learning models process environmental metrics to provide predictive analysis, preventing infection outbreaks before they disrupt your facility.",
    },
  ],
} as const;

// 4. Proof of Concept
export const proofOfConcept = {
  title: "Active Proof of Concept: West London Care Home",
  intro:
    "We are commencing a rigorous 12-month Proof of Concept (PoC) in a large West London Care Home to robustly prove the financial and operational benefits of our ecosystem.",
  stats: [
    {
      id: "financial-target",
      title: "Primary Financial Target",
      body: "Validating a direct reduction in the use of expensive Agency and Bank staff by mitigating staff illness and infection cross-transmission.",
    },
    {
      id: "independent-validation",
      title: "Independent Validation",
      body: "The University of West London (UWL) is engaged to audit monthly performance, matching historical vs. current spend alongside the external infection environment.",
    },
    {
      id: "cqc-compliance",
      title: "CQC Compliance",
      body: "Generating automated, concise monthly evidence packs specifically formatted for care home managers to submit during CQC inspector audits.",
    },
  ],
} as const;

// 5. Global Environmental Standards
export const standards = {
  title: "Global Environmental Standards",
  body: "Our systems continuously log data to demonstrate complete compliance on an annual basis with top-tier international building standards.",
  badges: ["RESET COMPLIANT", "WELL v2 ALIGNED"],
} as const;

// 6. Occupancy callout
export const occupancy = {
  title: "The Critical Success Factor: Occupancy",
  eyebrow: "A Clear Marketing Advantage",
  body: "By combining clinical-grade disinfection with independent monthly reports from the University of West London, partner care homes achieve an unprecedented marketing differentiator to optimize occupancy levels.",
  // Phrase within `body` shown with the highlighter treatment.
  highlight: "unprecedented marketing differentiator",
} as const;

// 6b. Section 05 — Air Intelligence (new copy supplied by the owner on
// 12 Oct 2026; not in the source HTML). Use exactly as written. Always say
// "Air Intelligence" ("SAS Air Intelligence" on first mention), never "AirCrew".
export const airIntelligence = {
  title: "Rules react. Air Intelligence thinks ahead.",
  paragraphs: [
    "Our service runs as one continuous loop. Every room is sterilised, measured, learned from and proven, every minute of every day.",
    "SAS Air Intelligence is our AI layer: six AI agents that learn how each room behaves and act before problems start. The longer it runs, the smarter it gets.",
  ],
  // Clockwise from the top of the loop diagram.
  loop: [
    { label: "STERILISE", caption: "iLimex units destroy airborne pathogens in every room." },
    { label: "MEASURE", caption: "Kaiterra monitors track the air in every room, every minute." },
    { label: "LEARN", caption: "Air Intelligence learns each room's rhythm and acts ahead of problems." },
    { label: "PROVE", caption: "Monthly CQC evidence packs, audited by the University of West London." },
  ],
} as const;

// 7. Footer
export const footer = {
  title: "Sterilised Air Solutions",
  body: "Our complete web presence is launching soon. For information regarding the West London PoC or waitlist opportunities, reach out below.",
  cta: {
    label: "Contact Our Team",
    href: "mailto:info@sterilisedairsolutions.co.uk",
  },
  legal:
    "© 2026 Sterilised Air Solutions. All rights reserved. Managed IoT Infrastructure for UK Care Providers.",
} as const;

// Top announcement banner. Reuses existing copy only (no new words) and links
// to its section. Swap this for a future announcement when there is one.
export const announcement = {
  text: proofOfConcept.title,
  href: "#proof-of-concept",
} as const;
