# Sterilised Air Solutions — Knowledge Base

Source: [`docs/reference/source.html`](reference/source.html) (a static one-page HTML file; no scripts, no images, no external assets).
Machine-readable copy: [`src/content/site.ts`](../src/content/site.ts) — the page must render from this file.

**Rule:** every word below is verbatim from the source, in the source's order. The new site keeps the same words and the same order; only the design changes.

---

## 1. What the business is

| Fact | Detail |
| --- | --- |
| Company | Sterilised Air Solutions |
| Offer | Zero Capex IoT air sterilisation, delivered as a fully managed service (24/7/365) |
| Market | UK care homes / UK care providers |
| Commercial model | No upfront capital expenditure ("Zero Capex") |
| Three value pillars | Clinical safety · proven financial returns · automated compliance |
| Status | Pre-launch. "Complete web presence is launching soon." Waitlist open. |
| Contact | info@sterilisedairsolutions.co.uk in the source; the site now uses **info@sterilisedairsolutions.com** (owner: the domain is .com, 12 Oct 2026) |

### The ecosystem (three layers)

| Layer | Provider / tech | What it does | Proof point |
| --- | --- | --- | --- |
| Sterilisation | ILimex | Medical Grade Log 6 sterilised air; destroys airborne pathogens; breaks cross-infection cycle | Independently validated by Ulster University |
| Monitoring | Kaiterra | Continuous Indoor Air Quality (IAQ) monitoring → LED displays with Red/Amber/Green status | Universal visual indicators |
| Intelligence | Predictive AI layer (in-house) | ML models on environmental metrics → predicts and prevents infection outbreaks | — |

### Proof of Concept (PoC)

- 12 months, a large care home in West London. Status: commencing.
- **Financial goal:** less spend on Agency and Bank staff, by cutting staff illness and infection cross-transmission.
- **Independent auditor:** University of West London (UWL). Monthly audit of historical vs. current spend, alongside the external infection environment.
- **Compliance output:** automated monthly CQC evidence packs that care home managers submit during CQC inspections.

### Standards

- RESET — compliant
- WELL v2 — aligned
- Compliance is shown each year from continuously logged data.

### Differentiator

- **Occupancy** is "the critical success factor". Clinical-grade disinfection plus independent monthly UWL reports gives care homes a marketing differentiator that helps fill beds.

### Glossary

| Term | Meaning |
| --- | --- |
| Capex | Capital expenditure (upfront equipment purchase) |
| IoT | Internet of Things: connected sensors and devices |
| Log 6 | 6-log reduction = 99.9999% of pathogens inactivated |
| IAQ | Indoor Air Quality |
| RAG | Red / Amber / Green status indicator |
| CQC | Care Quality Commission, the regulator for health and social care in England |
| PoC | Proof of Concept |
| UWL | University of West London |
| Agency / Bank staff | Temporary cover staff, costly to care homes |
| RESET | International building standard for continuous air quality data |
| WELL v2 | WELL Building Standard version 2 (health-focused building certification) |

---

## 2. Page copy: verbatim, in order

### `<title>`
> Sterilised Air Solutions | Zero Capex IoT Air Sterilisation for UK Care Homes

Document language: `en-GB`.

### Section 1: Header
- Logo: **Sterilised Air** *Solutions* (the word "Solutions" is accent-coloured)
- Badge: `Fully Managed Service 24/7/365`

### Section 2: Hero
Replaced on 12 Oct 2026 with owner-supplied copy (`hero` in site.ts). The source's
H1 (`Zero Capex IoT Air Sterilisation` / `For the UK Care Home Market`), subheading
and three tagline pills (`Medical Grade Log 6`, `AI Predictive Analysis`,
`CQC Reporting Ready`) were removed from the hero at the owner's request.
- H1: `Spend less on agency and bank staff`
- Subline: `Clean, sterilised air built to keep your staff well, protect your CQC rating and fill your beds.` **`Now live in a West London care home.`** (last sentence bold)
- Buttons: `Contact our team` (filled, to /contact) + `See how it works` (outlined, scrolls to 01)
- Tick line: `No upfront cost. Fully managed, 24/7/365.`

### Band: What we deliver (added 12 Oct 2026, no section number)
Owner-supplied copy, not in the source HTML. Sits between the hero and section 01.
- Label: `WHAT WE DELIVER`
- Headline: `Three results every care home owner cares about.`
- Subline: `All with zero upfront cost.`
Restyled 12 Oct 2026 as Fin-style stat columns (owner copy), result first: title, number, caption, rule, line. Footnote markers are raised numbers (¹ ²), not asterisks (owner request).
- Column 1: **Higher occupancy** / `£66k+` / `a year in fees for every bed you fill` + raised ¹ / `Fresher viewings, confident admissions and a visible reason for families to choose your home.`
- Column 2: **Lower agency costs** / `£305` / `a year per care worker in extra sickness costs, the cost we're built to cut` + raised ² / `Protecting the air your staff share, so fewer shifts are lost to sickness and covered by agency staff.`
- Column 3: **CQC reporting, automated** / `12` / `inspection-ready evidence packs a year` / `Generated every month, ready for your manager to sign off. No extra paperwork.`
- Footnote 1: `Based on an average private residential fee of £1,278 a week (LaingBuisson, 2024/25).` (£1,278 × 52 = £66,456, consistent with "£66k+".)
- Footnote 2: `Median cost of additional sick days per care worker compared with the UK average. Joseph Rowntree Foundation, The hidden cost of low pay in the social care sector.`
- Scroll cue: removed at the owner's request.

### Section 3: The Solution Ecosystem
- H2: `The Solution Ecosystem`
- Card 1: **ILimex Sterilisation**
  `Delivering Medical Grade Log 6 sterilised air independently validated by Ulster University. Destroys airborne pathogens to break the cycle of cross-infection completely.`
- Card 2: **Kaiterra Monitoring**
  `Continuous Indoor Air Quality monitoring linked directly to clear, user-friendly LED displays. Provides real-time status updates using universal visual indicators.`
  - RAG dots (labels are hover tooltips in the source):
    - Red: `Action Required`
    - Amber: `Cautionary Level`
    - Green: `Optimal Air Quality`
- Card 3: **Predictive AI Layer**
  `Advanced machine learning models process environmental metrics to provide predictive analysis, preventing infection outbreaks before they disrupt your facility.`

### Section 4: Proof of Concept banner
- H2: `Active Proof of Concept: West London Care Home`
- Intro: `We are commencing a rigorous 12-month Proof of Concept (PoC) in a large West London Care Home to robustly prove the financial and operational benefits of our ecosystem.`
- Stat 1: **PRIMARY FINANCIAL TARGET** (shown uppercase in the source; stored as `Primary Financial Target`)
  `Validating a direct reduction in the use of expensive Agency and Bank staff by mitigating staff illness and infection cross-transmission.`
- Stat 2: **INDEPENDENT VALIDATION**
  `The University of West London (UWL) is engaged to audit monthly performance, matching historical vs. current spend alongside the external infection environment.`
- Stat 3: **CQC COMPLIANCE**
  `Generating automated, concise monthly evidence packs specifically formatted for care home managers to submit during CQC inspector audits.`

### Section 5: Global Environmental Standards
- H2: `Global Environmental Standards`
- Body: `Our systems continuously log data to demonstrate complete compliance on an annual basis with top-tier international building standards.`
- Badges: `RESET COMPLIANT` · `WELL v2 ALIGNED`

### Section 6: Occupancy callout
- H3: `The Critical Success Factor: Occupancy`
- Eyebrow: `A Clear Marketing Advantage`
- Body: `By combining clinical-grade disinfection with independent monthly reports from the University of West London, partner care homes achieve an unprecedented marketing differentiator to optimize occupancy levels.`

### Section 6b: Air Intelligence (section 05, added 12 Oct 2026)
Owner-supplied copy, not in the source HTML. Sits between Occupancy and the footer.
- Headline: `Rules react. Air Intelligence thinks ahead.`
- Paragraph 1: `Our service runs as one continuous loop. Every room is sterilised, measured, learned from and proven, every minute of every day.`
- Paragraph 2: `SAS Air Intelligence is our AI layer: six AI agents that learn how each room behaves and act before problems start. The longer it runs, the smarter it gets.`
- Loop pills (clockwise from top): `STERILISE`, `MEASURE`, `LEARN`, `PROVE`.
- Caption under the diagram (static): `A fixed rule stays the same. Air Intelligence learns from every room, every day, and gets better with time.`
- Naming: always "Air Intelligence" / "SAS Air Intelligence"; never "AirCrew".

### Section 7: Footer
- H2 (source): `Sterilised Air Solutions`. **Replaced by the owner on 12 Oct 2026** with two lines around the 3D object: `Safer air, fuller care homes` / `made possible with SAS`.
- Body: `Our complete web presence is launching soon. For information regarding the West London PoC or waitlist opportunities, reach out below.`
- Button (source): `Contact Our Team` → `mailto:info@sterilisedairsolutions.co.uk`. **Now two buttons (owner, 12 Oct 2026):** `Contact our team` (filled black, same mailto) and `Join the waitlist` (outlined; mailto with subject "Join the waitlist" until a waitlist page exists).
- Legal: `© 2026 Sterilised Air Solutions. All rights reserved. Managed IoT Infrastructure for UK Care Providers.`

---

## 3. Source design reference (for context only; we are not reproducing it)

The source is a dark navy/sky-blue corporate layout. The new build is **light-themed, minimal and AI-native**, so treat these only as brand hints:

| Token | Value | Used for |
| --- | --- | --- |
| primary | `#0F172A` (slate-900) | Header, hero, footer backgrounds; headings |
| accent | `#0284C7` (sky-600) | "Solutions", badge, CTA, section underline |
| accent-light | `#E0F2FE` (sky-100) | Occupancy callout background |
| success / warning / danger | `#22C55E` / `#F59E0B` / `#EF4444` | RAG dots |
| text-main / text-light | `#334155` / `#64748B` | Body copy |
| bg-light | `#F8FAFC` | PoC banner |
| Font | System UI stack | — |

Source structure: header → dark gradient hero → 3-card grid → PoC banner (left accent border, 3 stat boxes) → standards (2 outlined badges) → occupancy callout card → dark footer with CTA.

---

## 4. Copy notes (left as-is, flagged for review)

These are kept verbatim because the rule is exact words. Change them only if the client signs off.

1. **"optimize"** (Occupancy body) uses US spelling. The rest of the page is UK English (`en-GB`, "Sterilisation"). UK spelling would be "optimise".
2. **"ILimex"**: check the brand's official capitalisation before launch.
3. **RAG labels** ("Action Required" / "Cautionary Level" / "Optimal Air Quality") were tooltip-only in the source. Showing them as visible text would be more accessible; the words stay the same.
4. **"PRIMARY FINANCIAL TARGET"** etc. are uppercase only through CSS. The stored text is title case.
5. **Footer copy says the site is "launching soon"**. This page *is* the interim web presence, so the copy is still accurate.
6. **© 2026** is hard-coded in the source. It is kept as text, not generated from the current year.
7. **Contact and waitlist pages (new copy, needs owner approval).** `/contact` and `/waitlist` were added on 12 Oct 2026 at the owner's request. Their wording is new (not from the source) and lives in `site.ts` (`formFields`, `formText`, `contactPage`, `waitlistPage`): the two-line headings ("Let's talk about / safer air", "Join the waitlist for / zero capex air sterilisation"), field labels, the "Number of care homes" choices (1, 2–5, 6–20, 21+), the updates checkbox line, and the thank-you lines. Nothing in it is a new claim; please confirm or reword.
8. **Privacy notice missing.** The forms collect names, emails and phone numbers. Under UK GDPR people should be told how their data is used, usually through a privacy notice linked under the form (Fin links Intercom's). SAS has no privacy page yet, so no line was invented. Add one before launch and link it from both forms.
9. **Updates checkbox.** It is unticked by default (PECR opt-in). Only send marketing updates to people who ticked it; the submission email shows "Updates: Yes/No".
10. **"Ask an AI" footer row.** The label "Ask an AI to summarise what we do." comes from the owner's reference. The prompt the links send is new: "Search the web for Sterilised Air Solutions (sterilisedairsolutions.com) and summarise what they do for UK care homes." It uses `siteDomain` in site.ts.
11. **RESET and WELL seals (03).** They are redrawn to look like the real marks (owner request). Check that SAS may display them: certification marks usually need the standard owner's permission. The WELL seal says "v2 ALIGNED" to match the approved claim; the real "WELL Health-Safety Rated" seal is only for holders of that rating.
