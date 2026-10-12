# Fin.ai Design Library

A reference of every visual element on fin.ai: how it is built, where it appears and what it measures. It was compiled on 12 Oct 2026 from a page-by-page walk of the site at 1280px and 375px widths, with computed styles read from the live DOM.

Use it as the style reference for the SAS landing page. It records **how Fin builds things**, not content to copy. Fin's text, logos, 3D renders and licensed fonts stay theirs; §9 maps each element onto SAS's own copy.

Element IDs (e.g. `C-07`) are stable, so we can refer to them during the build ("use C-07 for the standards badges").

---

## 0. Pages covered

| Group | Pages |
| --- | --- |
| Core | `/` home, `/fin4`, `/pricing`, `/customer-agent`, `/updates` |
| Roles | `/service`, `/sales`, `/ecommerce`, `/success` |
| How it works | `/capabilities`, `/train`, `/testing`, `/analyze`, `/procedures`, `/operator`, `/voice` |
| Channels | `/channels`, `/channels/live-chat` (email, social, slack sub-pages share this template) |
| AI technology | `/ai-engine`, `/cx-models`, `/api-platform`, `/trust-reliability`, `/research` |
| Integrations | `/integrations`, `/integrations/helpdesk`, `/integrations/zendesk` (salesforce, freshdesk, hubspot share this template) |
| Customers | `/customers`, `/customers/anthropic` (all story pages share this template) |
| Solutions | `/solutions/financial-services`, `/solutions/gaming`, `/solutions/enterprise` (technology, ecommerce share this template), `/startups` |
| Resources | `/blog`, `/learn`, `/glossary`, `/blueprint`, `/ai-sentiment-report`, `/events/ai-series/...`, `/deployment-services` |
| Company / conversion | `/about`, `/careers`, `/contact-sales`, `/view-demos` |
| Chrome | Announcement bar, nav and mega-menu, mobile nav, floating "Ask Fin" bar, chat widget, footer (light and dark) |

---

## 1. The system in one page

Fin runs **three page "families"** on one token set. Each family has a fixed type pairing and background logic.

| Family | Used on | Background | Display type | Body type | Feel |
| --- | --- | --- | --- | --- | --- |
| **A. Light editorial** | Home, about, blog, glossary, learn, Voice, Apex models | Off-white `#faf9f6` / white | **Serrif** light (300), huge, tight tracking | Saans 18 / Serrif 16 | Magazine-like, calm |
| **B. Light product** | Operator, Service/Sales/Ecom/Success, Testing, Pricing, Integrations, Customer Agent, Startups, Careers | Off-white page + **white inset panels** | **Saans** 400–500, two-tone grey→black | **Serrif 16** (serif body under sans headlines) | Crisp, product-y |
| **C. Dark editorial** | Channels, Capabilities, Train, Analyze, Procedures, AI Engine, Trust, Solutions, Customers, Updates, Deployment | Deep navy `#080f1e` | **IvoryLL** serif 300 | **MediumLL** sans + Saans Mono | Technical, blueprint-like |

Constants across all three:

1. **Two-tone headlines.** The lead-in is grey (40–60% opacity) and the payoff is full black or white.
2. **Mono micro-labels** (uppercase, letter-spaced, 10–12px) for every eyebrow, caption, tab and index.
3. **Small coloured squares** instead of dots: bullets, eyebrow markers, corner marks and tab indicators.
4. **Hairlines, not boxes.** Content is divided by 1px rules and whitespace. Radii are almost always 0–4px.
5. **Generous whitespace.** Sections sit 80–160px apart, and text columns rarely run wider than about 500px.
6. **One saturated accent per page** (orange by default, sometimes blue, purple, pink or lime). It is used sparingly: bullets, highlights and one hero object.
7. **Sculptural 3D objects** (tubes, knots, ribbons) as the only "illustration". They are never icons or clip-art.

---

## 2. Tokens

### 2.1 Colour

**Neutrals (light)**

| Token | Hex | Use |
| --- | --- | --- |
| `off-white` | `#faf9f6` | Page background, nav background |
| `white` | `#ffffff` | Inset panels, cards, form panel |
| `chalk` | `#f1eee9` | Media frames, active tab, compliance tiles, quote panels |
| `cream` | `#f4f3ec` | Apex/model pages, article cards |
| `paper` | `#f6f6f1` | Cream "paper" cards on dark pages |
| `canvas` | `#e7e3db` | Deeper warm grey surfaces |
| `linen` | `#dedbd6` | Card hairline borders (Service page) |
| `clay` | `#d3cec6` | Pricing card borders, FAQ separators |
| `black-5 … black-90` | `#e9e9e5` → `#191919` | Warm grey ramp |
| `off-black` | `#111111` | Primary button, ink |
| `black` | `#000000` | Headlines |

Text opacities: primary `#000`, secondary `rgb(0 0 0 / .8)`, tertiary `rgb(0 0 0 / .6)`. The grey half of a two-tone headline is `rgb(0 0 0 / .4)` (Saans) to `.5` (Serrif).

**Neutrals (dark)**: `deep-blue #080f1e` (page and dark cards), `dark-blue #020917`, `midnight #020918`. Text on dark is white, with `white / .6` for secondary and `#cecfd2` for FAQ questions.

**Accents**

| Token | Hex | Where |
| --- | --- | --- |
| `fin` / `orange` | `#ff5600` | Default accent: square bullets, highlights, active index, corner marks, featured-card border |
| `helpdesk` / `bright-blue` | `#0007cb` / `#000ce1` | Primary-button hover, corner squares, pricing-quote highlight |
| `operator` | `#441572` | Operator page panels and corner marks |
| `sales` / `sales-accent` | `#055895` / `#a3b3ff` | Sales role page |
| `ecom` / `ecom-accent` | `#2f6a5e` / `#e2f947` | Ecommerce role page |
| `voice-accent` | `#b9fe6f` | Voice page highlight and "NEW" chip |
| `lime` | `#e0ec26` | Alternate highlight |
| `bright-green / yellow / red` | `#6ad36d` / `#fcd85d` / `#ff6b6b` | Sentiment (positive / warning / negative). **Fin's own RAG palette.** |

**Highlighter effect.** A key phrase in a quote is "marked" with an accent background: `box-shadow: inset 0 -1em 0 0 <accent>`, or a solid accent background with black text. It is used once per quote.

### 2.2 Typography

| Role | Family (Fin) | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Display XL (home hero) | Serrif | 100 / 0.95 | 300 | −4.6px (−0.046em) |
| Display XL (Operator hero) | Saans | 139 / 1.0 | 500 | −5.5px (−0.04em) |
| H1 desktop token | — | 100 (6.25rem) / 0.9 | 400 | −0.25rem |
| H2 desktop | — | 80 (5rem) / 1.0 | 400–500 | −0.15rem |
| H3 desktop | — | 54 (3.375rem) / 1.0 | 400 | −0.1rem |
| H4 desktop | — | 40 / 1.0 | 400 | −0.075rem |
| H5 desktop | — | 24 / 1.0 | 400 | −0.03rem |
| H6 desktop | — | 20 / 1.2 | 400 | −0.0125rem |
| Numbered item title (home) | Serrif | 32 / 1.2 | 300 | −1.09px |
| Callout / quote | Saans | 24–28 / 1.15 | 400 | −0.06rem |
| Body large | Saans | 18 / 1.4 | 400 | −0.18px, colour black/.8 |
| Body (Family B) | Serrif | 16 / 1.4 | 300 | −0.16px, colour black/.7–.8 |
| Small / caption | Saans | 13–14 / 1.4 | 400 | black/.6 |
| Mono label | SaansMono | 10–12 / 1.0 | 400 | +0.6px (≈0.05em), UPPERCASE, black/.5–.6 |
| Nav link | Saans | 16 | 400 | — |
| Button | Saans | 14–16 | 400 | — |

Mobile: H1 drops to 48px / 0.95 (−2.2px tracking). H2 tokens drop to 40px, H3 to 30px, body to 14–16px.

Fonts in the stack: **Serrif** (and Condensed), **Saans**, **SaansMono**, **IvoryLL**, **MediumLL**, plus AeonikFono and ScrewtopLight on campaign pages. All are commercial licences. For SAS we use free equivalents (see §9.1).

### 2.3 Spacing and layout

- Base unit 4px. Grid: **12 columns, 24px gutter**. Page side padding **16px**. Container max 1920px, with content usually clamped to about 1200px.
- Inset panels sit **16px** from the viewport edges, with **80px** vertical inner padding and 16px horizontal inner padding plus inner grid margins.
- Section rhythm: 80–96px between panels, and roughly 120–160px between major ideas on single-surface pages.
- Text measure: body columns are **330–520px**. Headlines run to about 60% width, or full width when two-tone.
- Home "numbered list" geometry at 1280px: number at x≈49, title and body column at x≈119 (width 486–506), side-note column at x≈954 (width about 200).

### 2.4 Shape, lines, depth

- Radius: **0** on panels, frames and cards. **4px** on buttons. **6px** on nav pills and dark-family buttons. **16px** only on hero image cards (`/cx-models`, `/api-platform`, Fin 4 screenshots). Full pill only on the floating Ask bar, chat chips and "Play".
- Borders: 1px `linen`/`clay` on light, 1px white/10–20% on dark. The featured card gets a 1px accent border.
- Shadows: essentially none. One soft shadow on the floating Ask bar and mega-menu (`0 4px 37px #00000040`).
- Glass: the "Play" pill is translucent white with backdrop blur.

### 2.5 Motion (for reference; we will mostly **not** use it)

Fin uses: auto-rotating placeholder text in the Ask bar, auto-advancing tab cards with a thin progress line, blur/fade-in reveals (Fin 4), a scroll-tied sticky chapter selector, focus-dimming on the changelog, looping 3D video renders, and smooth scrolling. Easing tokens are the standard set (`ease-out-quart cubic-bezier(.165,.84,.44,1)` and similar).

---

## 3. Global chrome

### G-01 · Announcement bar (the "small banner on the top")
- Height **34px**, full bleed. The background is a **marbled iridescent image** (pastel swirl) instead of a flat colour.
- Centred single line: Saans 14 black, e.g. "Introducing Fin 4. A major step toward a fully agentic customer experience." followed by an **underlined** "Learn more".
- A **×** close button at the far right. Once dismissed it stays hidden; inner pages often don't show it.
- Mobile: the copy is shortened to the first sentence plus the link.

### G-02 · Top navigation
- Fixed. Height about 60–74px. Background off-white (light pages) or deep navy (dark pages). No border and no blur.
- Left: logo lockup (mark + wordmark, with a tiny "from salesforce" sub-line).
- Centre-left: Product ˅, AI Technology ˅, Integrations ˅, Customers ˅, Resources ˅, Pricing. Saans 16 w400. Hover/open state is a `chalk` pill (r6).
- Right: three text links (Log in · Contact sales · Start free trial), a **black primary button** "View demo", a thin vertical divider, then an **outline button** "Intercom →".
- Dark variant: white text, **white** primary button, outline secondary.

### G-03 · Mega-menu
- White panel, r≈6, hairline border, soft shadow. Opens under the nav item.
- **Two columns split by a vertical hairline.** Each top item has a title (Saans 16) and a grey subtitle (14), with a **→** aligned right.
- Sub-items are indented behind a **1px left rule**, each with a title and a grey one-liner. Some lines are lists of underlined inline links ("Train, Test, Deploy, Analyze").
- A full-width footer row is separated by a hairline: "Fin 4 is here / A major step…" with →.

### G-04 · Mobile nav
- Logo, one black CTA (Contact sales), outline "Intercom →", then a hamburger. Buttons get larger (about 48px high, 16px text).

### G-05 · Floating "Ask Fin" bar (AI-native hook)
- Fixed bottom-right, about 200×40. White **rounded-full pill** with a soft shadow.
- The placeholder **rotates through example questions** ("Can I see a demo for my use case?", "What would Fin cost for my team?").
- Small grey circular **↑ send** button on the right.
- On some pages it becomes a chat card: dark bubble "Hi there 👋 What would you like help with?" with suggestion chips.

### G-06 · Footer
- Same surface as the page (off-white or navy). **No logo, no big CTA block, no newsletter.** Padding 72 top / 36 bottom.
- **5–6 equal columns** (about 256px each). Column headers are **SaansMono 11px uppercase** (PRODUCT · AI TECHNOLOGY · SOLUTIONS · RESOURCES · FIN IN ACTION · COMPANY). Links are Saans 14 black with about 6px vertical rhythm. External links get **↗**.
- Bottom row: Terms · Privacy · Security · privacy-choices toggle, Saans 13 grey, left-aligned.
- The **closing CTA (S-12) always sits directly above the footer**, so the footer itself stays a quiet index.

---

## 4. Section separators: how the "banners" are divided

| ID | Technique | Spec | Seen on |
| --- | --- | --- | --- |
| **S-01** | **White panels on an off-white page** | Each section is a white block inset 16px from the viewport sides, r0, padding 80/16, separated by about 80px of off-white. The page reads as a stack of sheets. | Operator, Service, Testing, Integrations |
| **S-02** | **Full-bleed alternation** | Sections alternate `#fff` / `#faf9f6` edge to edge with no gap; the colour change is the divider. | Customer Agent, Pricing |
| **S-03** | **Tinted band** | One full-width band (inset 16px) with a soft watercolour/gradient texture (warm yellow-cream, peach) behind a single important section. | Home §03 (models), §08 (channels) |
| **S-04** | **Paper cards on dark** | Cream `#f6f6f1` cards, about 1010px wide, padding 32/48/48, on navy with about 24–32px gaps. Each has **L-shaped corner brackets**. | Channels, Train, Trust, Solutions |
| **S-05** | **Hairline rule** | 1px full-width rule under a section heading, or between rows. | Everywhere |
| **S-06** | **Corner squares** | 4–6px solid squares at the 4 corners of a frame, quote or section (accent or grey). Marks a "zone" without drawing a box. | Media frames, quotes, CTA strips |
| **S-07** | **Crosshair grid frame** | A 3×3 lattice of tiny grey squares around a whole section (corners plus thirds), like crop marks. | Closing CTAs, logo walls, About hero |
| **S-08** | **Blueprint lines** | Thin long vertical and horizontal rules framing the hero, like a technical drawing. | AI Engine, Capabilities, Channels CTA |
| **S-09** | **Running header** | Mono 10–11px label pair at the top of a panel ("FIN FOR SERVICE ……… CONTROL"), like a document header. | Service, Voice, Integrations |
| **S-10** | **Big whitespace** | Nothing but 120–160px of empty page between ideas. | Home |

---

## 5. Hero patterns

| ID | Name | Anatomy | Seen on |
| --- | --- | --- | --- |
| **H-01** | **Editorial left hero** | Off-white. H1 Serrif 100/300, left-aligned, 3 lines, about 55% width. Two buttons below (black + outline). A 3D object floats bottom-right, partly cropped. Huge empty space. | Home |
| **H-02** | **Centred two-tone statement** | H1 Saans 139/500, centred, one line: grey word + black word ("Meet / Operator"). Serif sub 16, max 576, centred. Buttons centred. Then a full-width accent media panel. | Operator |
| **H-03** | **Asymmetric hero** | Left about 60%: mono eyebrow "■ TESTING", H1 Saans 80 two-tone (grey lead-in → black payoff). Right about 35%, top-aligned: Serif 16 paragraph plus one or two buttons. | Testing, Zendesk, Helpdesk |
| **H-04** | **Split hero 50/50** | Left off-white, centred stack: eyebrow, H1 two-tone (black lines, then grey lines), small 3D object, Serif paragraph, buttons. Right: full-height image panel (3D macro shot) with floating product UI. | Service, Sales, Ecom, Success, Integrations, Startups |
| **H-05** | **Rounded image-card hero** | A big r16 image card inset 16px. Centred: brand mark, mono overline, H1 Serif 72 (2–3 lines), buttons. | CX Models, API Platform |
| **H-06** | **Dark editorial hero** | Navy. H1 IvoryLL 64–80 two-tone (grey → white), sometimes the second line is pushed right. Body 16 with a white first clause and grey rest. White and outline buttons (r6). Optional blueprint lines, stacked UI cards or an aurora light. Optional row of mono channel chips. | Channels, Capabilities, Train, Analyze, Trust, Solutions |
| **H-07** | **Headline split around an object** | Line 1 top-left, 3D object centre, lines 2–3 bottom-right. Framed by S-07 crosshair squares. | About |
| **H-08** | **Wordmark hero** | Silver gradient. Giant embossed serif wordmark fills the width, a chrome 3D object overlaps it, and a small 20px H1 sits bottom-left. | Fin 4 |
| **H-09** | **Aurora hero** | White with a soft radial colour bloom. Stacked serif H1 with a lime "NEW" chip. A dark pill "Try it live now" with a round CTA on the right. Mono badge card bottom-left. ↓ arrow at bottom centre. | Voice |
| **H-10** | **Plain centred** | Centred H1 Saans 54 black (2 lines) plus one black button, then a photo strip. | Careers, Pricing |

---

## 6. Typography devices

| ID | Device | Spec |
| --- | --- | --- |
| **T-01** | **Two-tone headline** | One heading, two `<span>`s: lead-in at 40–60% opacity, payoff at 100%. Either order works: grey→black (statement) or black→grey (Pricing: "AI customer service for just" grey, "$0.99 per outcome" black). |
| **T-02** | **Staggered headline** | The second line is indented or right-aligned ("Natural conversations. / ……Instant answers."). |
| **T-03** | **Numbered serif title** | Big serif "01" in its own column, then a Serrif 32 title (≤2 lines, about 486px), 16px gap, body paragraphs Saans 18 at 80% black with **underlined inline links**. |
| **T-04** | **Mono eyebrow with square** | 6px accent square + 8px gap + SaansMono 11 uppercase (+0.6px): "■ FIN FOR SERVICE". |
| **T-05** | **Bracket label** | Mono "[ 01.A ]", "[ MATTERPORT ]", "[ 4 ]" in grey, for side-notes, sources and indices. |
| **T-06** | **FIG label** | A small bordered tab in a frame's top-left corner: mono "FIG 1.A". |
| **T-07** | **Inline number lead** | A paragraph starts with a mono "01" followed by a wide gap ("01      Fin Voice transforms…"). |
| **T-08** | **Highlighter quote** | Quote at Saans 24–32 with a curly "“" hanging outside the column. **One** clause gets an accent background. Name 14 black + role 14 grey, or mono uppercase. |
| **T-09** | **Bold-in-grey paragraph** | Paragraph in 60% grey with the key phrase in black (Customer Agent essay, Capabilities hero). |
| **T-10** | **Footnote refs and margin notes** | Superscript mono "[01]" in serif reading text, with the matching note in the right margin ("[ 01 ]" + 14px quote). |
| **T-11** | **Meta row (masthead)** | Mono labels separated by accent squares: "IN PERSON & VIRTUAL ■ YBCA FORUM ■ THURSDAY SEPT 11", between double hairlines. (Events) |
| **T-12** | **Breadcrumb** | Mono "CUSTOMER STORIES ▸ ANTHROPIC", with the current item in the accent colour. |

---

## 7. Component library

### Buttons and links
| ID | Element | Spec |
| --- | --- | --- |
| **B-01** | Primary button | h40, px 14, r4, bg `#111`, white Saans 14–16. Hover bg `helpdesk` blue. On dark pages it inverts to a white button with black text (r6). |
| **B-02** | Secondary button | h40, r4, transparent, 1px `#111` border, `#111` text. Hover: 75% border and text. |
| **B-03** | Text link | Black, **underlined** (thin, about 2px offset). Used for "Learn more", "Read more", "Contact sales" next to a primary button. |
| **B-04** | Mono pill button | Centred, 1px border, mono 10 uppercase: "SHOW ALL 60 CONNECTORS (+48 MORE)". |
| **B-05** | Square icon button | 24–28px square, 1px border, ↗ inside. Sits in a card's top-right corner (Trust bento, story cards). |
| **B-06** | Play pill | Translucent white, backdrop blur, white "▶ Play" 14, r4, centred on video posters. |
| **B-07** | Pill chips | Rounded-full bordered chips for filters (Learn), A–Z letter boxes (Glossary), and company-size segmented choices (Contact). |

### Cards and blocks
| ID | Element | Spec | Seen on |
| --- | --- | --- | --- |
| **C-01** | **Feature column** | Accent square bullet, H3 Saans 18–20 (w400/500), body 14 grey, optional underlined "Learn more". Set 3–4 across. No box. | Operator, Service, Pricing |
| **C-02** | **Tab-card row** | Like C-01, but each is a tab tied to the media above. The active card has a `chalk` background, black text and a thin accent progress line on top; inactive cards are grey. | Service, Home roles |
| **C-03** | **Media frame** | `chalk` (or accent) rectangle, r0, with S-06 corner squares and product UI inside. Often a 3D render behind the UI. | Everywhere |
| **C-04** | **FIG frame** | Hairline border, **dotted-grid** background (about 16px dot pitch), T-06 label tab top-left. | Channels, Train |
| **C-05** | **Side-note card** | Narrow column (about 200px): hairline **top** border, T-05 label, 14px caption, small video thumbnail with B-06. | Home |
| **C-06** | **Stat card (big number)** | Translucent cream, hairline border, corner squares. Title Saans 24 with an **accent-coloured prefix** ("Apex 2.0:"), **giant number Saans 80 in accent** ("+8.6%"), caption 13 ("Confirmed resolutions vs Apex 1.0"). Three across. | Home §03 |
| **C-07** | **Compliance tile** | **Square** `chalk` tile (about 150px), corner squares, centred **line-art certification mark** in grey. Mono caption **below** the tile ("ISO 42001"). Five in a row. | Home §11, Service |
| **C-08** | **Stat tile (dark)** | Hairline-bordered tile: T-04 mono label top ("■ FIN RESOLUTION RATE…"), giant number about 64 bottom-left ("50.8%"). Three across. | Customer stories |
| **C-09** | **Metadata row** | Three columns, each with a hairline top, a mono label ("REGION") and a value of 16. | Customer stories |
| **C-10** | **Spec table** | Right column: mono "SPECIFICATION" header, then numbered rows "4.1  Understand intent…" (number mono grey, text 14), each row with a hairline under it. Left: "[ 4 ]" index and a serif H2 name. | CX Models, AI Engine |
| **C-11** | **Plan card** | White, 1px `clay` border, r0–2. Logo lockup, H3 24, desc 14, price block, primary + text link. The **featured** card has a 1px accent border and a mono tag ("MOST POPULAR") straddling the top edge. | Pricing |
| **C-12** | **Strip card** | Full-width `chalk`/white bar: title 20 + sub 14 on the left, underlined CTA on the right. Variant: corner squares, 2-col (H2 40 left / paragraph + 2 links right). | Pricing, Integrations |
| **C-13** | **Quote block** | On page or in a panel with corner squares. Company wordmark top-left, T-08 quote centre-left, **B&W portrait** about 180×180 right, name and role below. | Home, Operator, Service, Pricing |
| **C-14** | **Proof bento** | Grid of bordered tiles: logo top-left, B-05 top-right, then a serif headline, a quote or a **giant stat**, and a mono caption at the bottom. | Trust |
| **C-15** | **Story card** | Dark, hairline border, logo + outline "Read more". The feature variant has a photo half with white stat pairs ("$569k / COSTS SAVED ANNUALLY"). | Customers |
| **C-16** | **Read-more card** | Greyscale 3D image top, white body, H3 20, 14 grey, underlined link. Two across. | Operator |
| **C-17** | **Connector card** | Icon 20 + name 18 + 13 grey description. Four across, no box. | Integrations |
| **C-18** | **Person card** | B&W portrait in a `chalk` frame with corner squares, name Saans 24 (or mono uppercase), mono role, 13 bio, "Read full bio". | About, Home §18 |
| **C-19** | **Office/location item** | Accent square bullet, city Saans 18, 2-line address 12 grey, underlined "View roles". 3×2 grid. | About |
| **C-20** | **Logo wall** | 6×3 (home) or 4×3 (roles) greyscale wordmarks, no boxes, large row gaps, optional mono caption above ("OVER 12,000 COMPANIES…"). | Home, Roles, Operator |
| **C-21** | **Badge card** | Small chalk/white card with corner dots: mark + 3 mono lines ("POWERED BY APEX FLASH / OUR FASTEST MODEL YET / LEARN MORE →"). The orange "stamp" variant is on dark. | Voice, Capabilities, AI Engine |

### Lists, tabs, navigation aids
| ID | Element | Spec | Seen on |
| --- | --- | --- | --- |
| **N-01** | **Numbered long-list** | "22 reasons": T-03 items stacked with lots of space, each with optional media and a C-05 side-note. | Home |
| **N-02** | **Sticky chapter selector** | Fixed **bottom-left** white box (about 260×48): "05  Weekly releases ▾". It updates as you scroll and opens a jump list. On mobile it becomes a sticky bar under the nav. | Home |
| **N-03** | **Sticky left index** | About 176px wide, top 32px, on dark: "01 VOICE / 02 EMAIL …" mono 11–12, hairline between rows, active row white with a short **accent underline**. | Channels, Capabilities, Trust, AI Engine |
| **N-04** | **Timeline ruler** | Sticky left: mono month in accent ("SEP 2026"), tick-mark dashes, entry titles in mono. Entries out of focus are dimmed. | Updates |
| **N-05** | **Tab strip** | Bordered row of equal mono uppercase tabs (ANTHROPIC · GLEAN · NEO FINANCIAL). The active tab has an accent top bar; content panel below. | Pricing, Service |
| **N-06** | **Vertical progress accordion** | Left list: active item has a `chalk` background with an accent progress line on top and expanded body. Right: sticky media. | Service ("Fit Fin into your stack") |
| **N-07** | **FAQ** | Two columns: big "FAQs" (Saans 54 or IvoryLL) left; right accordion rows (question 18) with hairline separators and a small ▾. The dark variant is a navy card. | Most pages |
| **N-08** | **Bullet row** | Inline row of 3 claims, each with an accent square, 13–14px, centred under the hero. | Pricing, Contact |

### Forms
| ID | Element | Spec |
| --- | --- | --- |
| **F-01** | Contact split | Left off-white **proof column** (G2 line, H1 32 two-line, N-08 list, C-20 logo card, C-13 quote). Right white **form panel** with accent corner squares and centred H2 "Get a personalized demo". |
| **F-02** | Inputs | Label 13 with *, field h44, `chalk` fill, 1px `clay` border, r2, placeholder grey. Segmented chips for choices. Full-width black submit. Small checkbox consent. |
| **F-03** | Modal step form | Centred white card with corner squares, "Back" text link, two-tone H2, two fields, black "Continue", thin accent progress bar at the bottom. |

### Closing CTA
| ID | Element | Spec |
| --- | --- | --- |
| **S-12** | **Closing CTA** | The last block before the footer. **Centred huge headline** (Serrif 100 on home, Saans 80 on product pages, IvoryLL 72 on dark), often two-tone. A 3D object either sits between the headline lines (home) or as a small square tile below. Two buttons. Framed by the S-07 crosshair squares. Plenty of empty space above and below. |

### Imagery
| ID | Element | Spec |
| --- | --- | --- |
| **I-01** | 3D sculptural object | Glossy tube, knot or ribbon in the page accent (copper on home and Service, indigo on Sales, lime on Ecom, steel on Success, chrome on Fin 4). Used once or twice per page, never as decoration in every card. |
| **I-02** | Macro 3D background | Extreme close-up of the same material, used as a full-bleed panel behind product UI. |
| **I-03** | Product UI overlays | Real UI screenshots (chat, procedures, dashboards) floated on I-02, crisp, with light shadow. |
| **I-04** | B&W portraits | Every person photo is greyscale in a square crop. |
| **I-05** | Line-art diagrams | Thin grey (light) or white (dark) wireframe drawings: globe wireframe behind statements, isometric engine diagram, flywheel circle with pill nodes. |

---

## 8. Page-by-page inventory

Each line is the section order. IDs refer to §3–§7.

| Page | Family | Sequence |
| --- | --- | --- |
| **/** Home | A | G-01 → G-02 → **H-01** → "22 reasons to hire Fin" H2 56 → **N-01** items 01–22: 01 performance (chart + C-05) · 02 customers (C-20 logo wall) · 03 models (**S-03** band + 3× **C-06**) · 04 roles (image + **C-02** tabs) · 05 updates · 06 procedures (C-03) · 07 integrations (UI) + **C-13** · 08 channels (S-03 band, channel icons, UIs) · 09 helpdesks (logo tiles + quote) · 10 control (UI) · 11 trust (5× **C-07**) · 12 flywheel diagram · … · 18 team (C-18) · 19 research (image cards) · 20 events (photo + thumb strip) · 21 pricing (C-13) · 22 vision (2-col numbered list) → **S-12** (Serrif 100 + 3D knot between lines) → G-06. **N-02** chapter selector and **G-05** Ask bar float throughout. |
| **/operator** | B | **H-02** + orange media panel → C-20 logo strip (mono caption) → T-01 statement + T-04 + video/Serif text → grey banner card → **S-01** panels: two-tone H2 80 + T-04 + Serif para + purple C-03 + 4× C-01 → C-13 (purple corner squares) → panel (knowledge) → orange **CTA banner** (H2 54 + buttons + 3D overflow) → panel (data) → 2× C-16 → C-13 → panel (operations, 3 media cards) → **S-12** with S-07. |
| **/channels** | C | **H-06** (stacked UI cards + mono channel chips) → **N-03** index + **S-04** cards per channel: T-04 eyebrow + hairline, IvoryLL 72 (alternating left/right, T-02), T-07 paragraph, "Learn more", C-04 FIG + 3 features; quote card (logo box + T-08) → dark FAQ card (N-07) → dark S-12 (two-tone, offset). |
| **/pricing** | B (white) | **H-10** two-tone reversed + N-08 → 2× **C-11** → C-12 strip → centred two-tone H2 40 + C-01 list + image → note line → calculator card → add-ons band (2 bordered cards) → **N-05** tabs + quote (blue highlight) → N-07 → S-12. |
| **/customer-agent** | B | Hero with accent corner squares + Saans 100 centred + logos → essay (video + Serif 22 text, **T-10** margin notes) → S-02 alternating sections: T-04 + H2 54 + hairline + 50/50 rows (full-bleed image / H3 40 + "NEW" chip + Serif + outline button) → N-07 → closing. |
| **/service** (+ sales, ecommerce, success) | B | **H-04** → C-20 (4×3, crosshair frame) → centred T-01 on globe line-art + 3D tile → **S-01** panels with **S-09** running header: H2 80 T-01/T-02, Serif para, C-03, **C-02** row → C-13 band → … → N-05 story tabs → **N-06** stack accordion → 5× C-07 security → **S-12** → N-07. |
| **/testing** | B | **H-03** → panels: two-tone H2 80 (T-02) + T-04 + Serif + large C-03 + 3× C-01 → C-13 (pink highlight) → … |
| **/capabilities**, **/ai-engine** | C | H-06 with **S-08** blueprint lines + C-21 orange stamp → N-03 index → dark cards: T-04, IvoryLL 48 left / T-07 para + outline button right, "FEATURED CAPABILITIES:" mono label, C-04 frames. The AI Engine variant has an isometric I-05 diagram centre and a phase card with **C-10** spec rows on the right. |
| **/train**, **/procedures**, **/analyze**, **/trust-reliability**, **/solutions/*** | C | H-06 variants (Analyze: light-beam photo; Trust: aurora; Procedures: 3 one-sentence lines + isometric icon grid) → N-03 → S-04 cards → Trust adds **C-14** proof bento. |
| **/voice** | A | **H-09** → panels with S-09 → C-13 (lime highlight). |
| **/cx-models**, **/api-platform** | A (cream) | **H-05** → model rows: "[ n ]" + Serrif H2 + **C-10** spec table, separated by hairlines. |
| **/fin4** | A | **H-08** → video → H2 54 sections, r16 frosted screenshot panels, small blue square bullets, blur-in reveals. |
| **/updates** | C | Serif H1 + sub + hairline → **N-04** ruler → 3-col entries (title / body + "Read more" / thumbnail). |
| **/integrations** | B | H-04 (orbit logo nodes) → 4-col **C-17** + B-04 → C-12 with corner squares → panels (helpdesks). |
| **/integrations/{zendesk,…}** | B | **H-03** → full-bleed gold I-02 band with UI and floating mono tag. |
| **/customers** | C | Dark bento of **C-15**. |
| **/customers/{story}** | C | T-12 breadcrumb → wordmark → IvoryLL H1 + mono byline → hero image → 3× **C-08** → **C-09** → cream article card ("■ AT A GLANCE") with left sticky "See all stories" + share buttons. |
| **/about** | B | **H-07** → mission letter (Saans 24 paragraphs, no heading) → leadership 3-col C-18 → "Our offices" 3×2 **C-19**. |
| **/careers** | B | H-10 → full-bleed 4-col photo strip. |
| **/startups** | B | H-04 (lilac cloud photo) → logo strip. |
| **/contact-sales** | B | **F-01 / F-02**. |
| **/view-demos** | C | Dark page with **F-03** modal. |
| **/blog**, **/research** | A | Saans 54 title; feature post = large image left + tag chip, author/date, H2 32, black "Read more"; research = 2-col list with hairline separators, tag chip, names, date, H3 24, "Read more". |
| **/learn**, **/glossary** | A | Serrif 56 title + sub → filter chips (B-07) or search + A–Z boxes → 2-col rows (Serif term left / definition right) with hairlines. |
| **/blueprint** | — | Its own sub-brand: graph-paper pale-blue grid background, outlined/dashed serif "Blueprint" wordmark, royal-blue serif headings, dashed-line 3D drawings. |
| **/events/…** | — | Masthead layout: mono meta row **T-11**, double rules, SerrifCondensed + Saans H1, 5-col strip with vertical rules. |
| **/ai-sentiment-report** | B (white) | Left hero: mono overline, Saans 54, Serif para, black button. |

---

## 9. Applying this to the SAS landing page

### 9.1 Font substitutes (free, from Google Fonts / already installed)
| Fin | SAS substitute | Why |
| --- | --- | --- |
| Serrif 300 (display) | **Newsreader** 300 (variable opsz) | Sharp light text serif that holds up at 100px with negative tracking |
| Saans 400/500 | **Geist** (already in the repo) | Neutral grotesk at similar widths |
| SaansMono | **Geist Mono** (already in the repo) | Matches Geist for labels |

### 9.2 Recommended family
**Family B (Light product) on an off-white page, with Family A's serif headline in the hero.** It gives the most "AI-native" look with the least motion, and matches the request for light, minimal and boxy. Accent: **SAS sky blue `#0284C7`** in every place Fin uses orange (squares, highlight, corner marks), with the Fin RAG trio for the Kaiterra dots.

### 9.3 Section → element mapping (SAS words unchanged, source order kept)

| SAS section (site.ts) | Fin elements to use | Notes |
| --- | --- | --- |
| 1 Header (logo + "Fully Managed Service 24/7/365") | **G-02** nav: logo left; the badge as a mono label with an accent square on the right; no menu links (single page) | The badge could instead be the **G-01** top banner. It is the same words in the same position, styled as Fin's small top banner. |
| 2 Hero (H1 2 lines + sub + 3 taglines) | **H-03** asymmetric, or **H-01** editorial left: H1 as **T-01** two-tone (line 1 black, line 2 grey), sub in Serif 16 on the right, taglines as **N-08** bullet row with accent squares | No buttons; the source hero has none. Optional single I-01-style object would need our own render. |
| 3 The Solution Ecosystem (3 cards) | Section title + hairline (**S-05**), then 3× **C-01** feature columns (or **C-02** static tab cards) inside an **S-01** white panel | Kaiterra card: RAG as three accent **squares** with mono labels (Action Required / Cautionary Level / Optimal Air Quality), visible, not tooltips. |
| 4 Proof of Concept (title, intro, 3 stats) | **S-01** panel with **C-10** spec-table rows or 3× **C-08**-style labelled tiles; intro in Serif 16 | Each stat title becomes a mono label (Fin's T-04), with the body underneath. |
| 5 Global Environmental Standards (title, body, 2 badges) | 2× **C-07** compliance tiles: square chalk tile, corner squares, badge text as mono caption | We have no certification artwork, so the tile carries the badge text large in mono, or a simple line mark we draw. |
| 6 Occupancy callout (title, eyebrow, body) | **C-13**-style callout block with **S-06** corner squares; eyebrow as T-04; one phrase **T-08 highlighted** | The highlight needs a decision: which phrase gets marked. |
| 7 Footer (title, body, CTA, legal) | **S-12** closing CTA (centred big two-tone title, Serif body, one B-01 button, S-07 crosshair frame), then a minimal **G-06** bottom row with the legal line | No link columns (single page, no extra words). |

### 9.4 What we deliberately leave out
Auto-rotating text, auto-advancing tabs, blur-in reveals, smooth-scroll hijack, the sticky chapter selector, looping 3D video, chat widget and mega-menus. Static hover states only (button colour change, underline offset).

### 9.5 Open decisions before building
1. **Top banner vs header badge.** Should "Fully Managed Service 24/7/365" sit in the nav (right side) or in a G-01 banner strip above it?
2. **Hero layout.** H-01 (big serif, left, airy) or H-03 (two-column asymmetric)?
3. **Small labels.** Fin numbers sections ("01", "[ 01 ]") and adds running headers. These are new characters/words not in our source. Allow numbers only, or nothing extra?
4. **Highlight phrase** in the Occupancy body, if any.
5. **3D object.** Fin's signature visual. We would need our own render/asset, or skip imagery entirely.
