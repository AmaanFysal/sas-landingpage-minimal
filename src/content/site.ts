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

// 2b. "What we deliver" band (new copy supplied by the owner on 12 Oct 2026;
// not in the source HTML). Sits between the hero and 01, with no number.
export const deliver = {
  label: "WHAT WE DELIVER",
  title: "Three results every care home owner cares about.",
  subline: "All with zero upfront cost.",
  cards: [
    {
      title: "Higher occupancy",
      line: "Fresher viewings, confident admissions and a visible reason for families to choose your home.",
      fact: "An empty private bed costs over £66,000 a year in lost fees.*",
    },
    {
      title: "Lower agency costs",
      line: "Protecting the air your staff share, so fewer shifts are lost to sickness and covered by agency staff.",
      fact: "Being measured now in our 12-month West London proof of concept.",
    },
    {
      title: "CQC reporting, automated",
      line: "Inspection-ready evidence packs generated every month, ready for your manager to sign off.",
      fact: "No extra paperwork for your team.",
    },
  ],
  footnote: "*Based on an average private residential fee of £1,278 a week (LaingBuisson, 2024/25).",
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
  // Pill labels, clockwise from the top of the loop diagram.
  loop: [{ label: "STERILISE" }, { label: "MEASURE" }, { label: "LEARN" }, { label: "PROVE" }],
  // Single static caption centred under the diagram.
  loopCaption:
    "A fixed rule stays the same. Air Intelligence learns from every room, every day, and gets better with time.",
} as const;

// 7. Footer
// The closing headline and button labels were replaced by the owner on
// 12 Oct 2026 (source had "Sterilised Air Solutions" and "Contact Our Team").
export const footer = {
  // Line above / below the 3D object.
  titleLines: ["Safer air, fuller care homes", "made possible with SAS"],
  body: "Our complete web presence is launching soon. For information regarding the West London PoC or waitlist opportunities, reach out below.",
  cta: {
    label: "Contact our team",
    href: "/contact",
  },
  waitlist: {
    label: "Join the waitlist",
    href: "/waitlist",
  },
  legal:
    "© 2026 Sterilised Air Solutions. All rights reserved. Managed IoT Infrastructure for UK Care Providers.",
} as const;

// Top announcement banner. Reuses existing copy only (no new words) and links
// to its section. Swap this for a future announcement when there is one.
export const announcement = {
  text: proofOfConcept.title,
  // Small screens show the first part only (Fin shortens its banner the same way).
  shortText: proofOfConcept.title.split(":")[0],
  href: "#proof-of-concept",
} as const;

// 8. Contact and waitlist pages (owner request 12 Oct 2026). Layout after
// fin.ai's /view-demos (dark modal step form) and demo form (light). The
// wording below is new and awaits owner approval (knowledge-base §4).
// Submissions are emailed to `contactEmail` via Resend (src/app/actions).
export const contactEmail = "info@sterilisedairsolutions.co.uk";

export const formFields = {
  email: { label: "Business email address", placeholder: "Business email address" },
  name: { label: "Full name", placeholder: "Full name" },
  organisation: { label: "Care home or group", placeholder: "Care home or group" },
  phone: { label: "Phone number", placeholder: "Phone number" },
  message: { label: "How can we help?", placeholder: "Tell us about your care home" },
  homes: { label: "Number of care homes", placeholder: "Select…", options: ["1", "2–5", "6–20", "21+"] },
  role: { label: "Your role", placeholder: "Your role" },
  updates: { label: "Send me updates about Sterilised Air Solutions and the West London Proof of Concept." },
} as const;

export const formText = {
  back: "Back",
  required: "Please fill in this field.",
  invalidEmail: "Please enter a valid email address.",
  sending: "Sending…",
  // {email} is replaced with contactEmail.
  failed: "Something went wrong. Please email us at {email}.",
} as const;

export const contactPage = {
  title: "Contact our team",
  // Two-tone heading: muted first line, strong second line.
  // Kept short so it sits on two lines like Fin's ("Let's get your / Fin demo started").
  titleLines: ["Let's talk about", "safer air"],
  next: "Continue",
  submit: "Send",
  done: { title: "Thank you", body: "Your message is with our team. We'll be in touch." },
} as const;

export const waitlistPage = {
  title: "Join the waitlist",
  titleLines: ["Join the waitlist for", "zero capex air sterilisation"],
  next: "Next",
  submit: "Join the waitlist",
  done: { title: "You're on the waitlist", body: "Thank you. We'll be in touch." },
} as const;

// 9. "Ask an AI" links in the footer (owner request 12 Oct 2026, wording from
// the owner's reference). Each opens the AI with a prompt that asks it to
// search for SAS and summarise it. Gemini has no reliable prompt-in-URL
// support, so its link opens Google's AI Mode (Gemini) instead.
const askAiPrompt =
  "Search the web for Sterilised Air Solutions (sterilisedairsolutions.co.uk) and summarise what they do for UK care homes.";
const q = encodeURIComponent(askAiPrompt);
export const askAi = {
  label: "Ask an AI to summarise what we do.",
  links: [
    { icon: "chatgpt", name: "ChatGPT", href: `https://chatgpt.com/?hints=search&q=${q}` },
    { icon: "claude", name: "Claude", href: `https://claude.ai/new?q=${q}` },
    { icon: "grok", name: "Grok", href: `https://grok.com/?q=${q}` },
    { icon: "gemini", name: "Gemini", href: `https://www.google.com/search?udm=50&q=${q}` },
  ],
} as const;
