@AGENTS.md

# Sterilised Air Solutions: minimal landing page

A single-page Next.js (App Router) site deployed on Vercel.

## Content rules (non-negotiable)
- All copy lives in `src/content/site.ts`, taken verbatim from `docs/reference/source.html`.
- Keep the **exact words** and the **exact section order**: Header → Hero → "What we deliver" band (no number) → 01 The Solution Ecosystem → 02 Proof of Concept → 03 Global Environmental Standards → 04 Occupancy → 05 Air Intelligence → Footer.
- **Sections 01–04 are CEO-approved: never change their text, order or numbering.**
- The "What we deliver" band copy (`deliver` in site.ts) was supplied by the owner (not in the source HTML). It has no section number and sits on the off-white page between the hero and the white sheet: label, 32px headline, subline, three white cards (blue `t-card` title, line, rule, muted fact) aligned with subgrid, then a footnote (the down-arrow to 01 was removed at the owner's request).
- Section 05 copy was supplied by the owner (not in the source HTML); it lives in `airIntelligence` in site.ts. Always write "Air Intelligence" ("SAS Air Intelligence" on first mention). **Never "AirCrew".** No extra claims, statistics or technical detail in 05.
- Never hard-code copy in components. Import it from `@/content/site`.
- Copy questions and flagged issues are in `docs/knowledge-base.md` §4. Don't "fix" them silently.
- **No added label words**, ever (no "Learn more", running headers, etc.). The owner thinks extra labels look AI-generated. **Numbers are welcome**: sections are numbered 01–04 and items 1.1, 2.1, 3.1….
- CSS `uppercase` is fine for styling, except where it would change the source's own casing (e.g. "WELL v2 ALIGNED" must keep the lowercase v).
- Closing block: headline `footer.titleLines` ("Safer air, fuller care homes" / "made possible with SAS", owner copy replacing the source heading) around the 3D object, then the source paragraph, then Fin's button pair: filled black "Contact our team" + outlined "Join the waitlist".
- Footer last row (`LegalRow`, owner request 12 Oct 2026): the legal line, plus a small "Ask an AI to summarise what we do." with four 28px monochrome icon links (`askAi` in site.ts; icons in `ai-icons.ts` from Lobe Icons, MIT). It sits side by side from 1280px and stacks below that.
  - The links are ChatGPT, Claude, Grok and Gemini. Each opens with a prompt asking it to search for and summarise SAS.
  - Gemini has no reliable prompt-in-URL support, so its link opens Google's AI Mode (`udm=50`).
- Top banner (`announcement` in site.ts) is reserved for announcements. It currently reuses the PoC title and links to that section. "Fully Managed Service 24/7/365" must **not** go in the banner; it sits in the nav as a status label. The banner and nav **stick to the top** while scrolling, like Fin's (`SiteHeader`; `scroll-padding-top` in globals.css keeps anchor jumps below them). The nav's right side is the status badge (from 1024px) plus the Contact / Waitlist button pair (`cta-buttons.tsx`, shared with the closing block); the full logo is 40px tall (32px on phones), and below 440px only "Contact our team" fits beside it. The banner's × is a plain white cross over the art (dark on the plain strip below 740px), no box. The banner copies fin.ai's markup and breakpoints exactly (`announcement-bar.tsx`, owner request 12 Oct 2026):
  - **Art:** close-up crops of our hero ribbon render (`scripts/banner-art/crop.mjs` → `public/art/banner-art-*.webp`), the way Fin crops its 3D object. Never go back to generated noise art; the owner rejected it.
  - **From 1024px:** `--banner` grey (#e1e2e5). The left sweep (max 372px, anchored to the text side) and right navy bulb (max 469px) sit at the screen edges, sharp edges facing the text, cropped from the outside as the screen narrows.
  - **740–1023px:** `--banner-low` grey (#d9d9d9) and the soft mobile art in boxes up to 195px, masked to fade over 48px towards the text.
  - **Below 740px:** the mobile art across the bar (half each side, max 195px) and the shortened text (`announcement.shortText`).
  - Text 14/18 with 0.031rem tracking and Fin's sliding underline.

## Built page (decisions made with the owner)
- Hero is a **container** (white panel inset 16px like the sheet) and follows fin.ai's media rule: **one render**, the heart-shaped ribbon (`public/art/air-ribbon-loop.webp`, angle rx=-0.6 ry=-0.5 rz=2.2), used in BOTH the hero and the closing block. The owner calls this "the top render"; never swap in a different angle. From 1280px it starts at column 8, larger than the closing view, running off the panel's right and bottom edges (still recognisable as the heart). Tablets: large, centred, bleeding off the bottom. Phones: whole but wider than the panel (sides trimmed), bleeding off the bottom. Placement rules: `.hero-art` in globals.css.
- **Typeface: Helvetica Neue everywhere** via the system stack (`"Helvetica Neue", Helvetica, Arial`). No web fonts. Windows/Android fall back to Arial unless a Helvetica Neue web licence is bought.
- **Type sizes and text colours match the fin.ai homepage exactly** (measured at 1440px). Use the `t-*` utilities in `globals.css`: `t-display` 100/95 −4.6px light, `t-callout` 32/38.4 light (section titles and numbers), `t-body-lg` 18/25.2 black 80%, `t-card` 24, `t-title-sm` 20, `t-body` 16 black 70%, `t-quote` 24, `t-caption` 14, `t-label` 12 uppercase.
- **Container colours match the Fin homepage**: off-white `#faf9f6` page (header, hero, closing, footer); one white sheet inset 16px holding sections 01–05 (no bottom padding, so 05's band runs to the sheet's edge with no white strip); chalk `#f1eee9` frames and tiles; soft sky-blue band (`bg-band-sky`, SAS logo blue, owner preference over Fin's cream) behind 02 with 70% white blurred cards; chalk-to-white quote panel for 04; 8px grey squares inside frame corners.
- Grid: 12 columns, 16px gutters, 16px page inset; content in columns 2–11 (equal left/right margins).
- **Alignment frame (owner request):** two vertical guides, mirrored left/right.
  - Outer "frame" line = middle of column 1 (`--frame` in globals.css, 16px on phones). Logo, section numbers (`num-hang`) and the footer legal line **start** on it. The status badge and the banner × **end** on its mirror. Use `frame-x` for any new full-width row.
  - Inner content line = column 2 start / column 11 end: headlines, body, cards, panels.
  - Surfaces (white sheet, cream band, closing crop marks) sit at the 16px page inset.
- Accent from the SAS logo: sky `#57B9FF` (squares, highlight, fills), `--sky-ink #0B74B8` for all blue text (same hue, dark enough to read). Don't introduce any other blue. Headings are Fin black `#000`, buttons `#111`.
- Section 03 tiles show the RESET and WELL seals redrawn as SVG in `seals.tsx` in **fin.ai's certification-tile style** (owner request 12 Oct 2026). Like Fin's ISO/SOC2/HIPAA tiles, each is grey line work (#AEACA8, ~1.5 stroke) filling the chalk tile, the drawing using the middle ~58%: big lettering hollow (WELL), small lettering solid. They keep the real marks' shapes.
  - The WELL seal's small text reads "v2 ALIGNED", the approved claim, **not** "Health-Safety Rated", which is a separate rating SAS hasn't confirmed it holds. Only change it if the owner confirms that rating.
  - Using these marks normally needs the standard owners' permission; flagged to the owner.
- Highlighter phrase in Occupancy: "unprecedented marketing differentiator" (`occupancy.highlight`).
- Section 05 sits on its own deeper sky band (`bg-band-deep`, owner request 12 Oct 2026: same logo blue, stronger tint than 02's band) and follows Fin's flywheel: text left, frosted white rounded panel right (matching 02's cards) (`loop-diagram.tsx`): STERILISE → MEASURE → LEARN → PROVE. Its motion copies Fin's flywheel (a Rive file, measured frame by frame; owner request 12 Oct 2026): a 9s loop where a blue arc crawls slowly round the ring, the next pill lights as the previous one dims, the old arc collapses quickly into the lit pill, and a thin line joins the SAS mark to the lit pill while the mark goes from grey to full colour. Steps alternate between the line running mark → pill (STERILISE, LEARN) and pill → mark (MEASURE, PROVE). Timings and easing curves are the constants at the top of the file. It plays only while on screen. One static caption is centred underneath (`loopCaption`); the per-step captions were removed at the owner's request. It keeps playing on hover (owner request 12 Oct 2026); only keyboard focus on a pill pauses it, and pills are clickable. Under `prefers-reduced-motion` (and before JS loads) it shows a still frame: STERILISE lit and connected.
- **Contact and waitlist pages (owner request 12 Oct 2026):** the closing buttons link to `/contact` and `/waitlist`, both two-step forms after fin.ai's (`components/forms/lead-form.tsx`).
  - Both copy fin.ai's live pages, measured from their DOM on 12 Oct 2026. Sizes are in `lead-form.tsx`; keep them, since the owner rejected anything larger.
  - `/contact` is **dark** and built like Fin's `/view-demos`. A real dark SAS page made from existing copy sits behind the form: the hero subheading, taglines, buttons, outcome cards and legal line, with no big heading or render (owner request). It sits behind a fixed layer with an 8px backdrop blur (owner asked for more than Fin's 4px). The page is exactly one screen tall and doesn't scroll; only the form layer scrolls, on short screens. The nav stays sharp above it. The form is Fin's gate card:
    - 620px wide, clay corner dots inset 16px, a 14px "Back" link
    - 40px two-tone heading (first line at 60%), 14px labels, 40px off-white inputs with a 20% border
    - 40px button, 4px progress bar
  - `/waitlist` is **light** and built like Fin's `/contact-sales` (the company-size form), on a white page and nav:
    - 472px column, content 112px under the nav, a 36px heading (30px and left-aligned on phones)
    - 11px spaced capitals for labels, 52px cream fields (48px select) with a `#7b7b78` border
    - 48px black button (6px corners), consent checkbox under it
  - Inner pages use `SiteHeader inner` (logo links home, no banner) and end with `LegalRow`.
  - Copy is in `site.ts` (`formFields`, `formText`, `contactPage`, `waitlistPage`) and still needs owner approval (knowledge-base §4). Don't add a privacy line until the owner has a privacy notice.
  - Submissions go through the `sendLead` server action (`src/app/actions/send-lead.ts`), which re-validates everything, drops honeypot hits, and emails `contactEmail` (info@sterilisedairsolutions.com) via **Resend** (Vercel Marketplace, free plan, EU region; env `RESEND_API_KEY`). It sends from `forms@sterilisedairsolutions.com` (`siteDomain` in site.ts; the company domain is .com, not the source's .co.uk), which only works once the domain's DNS records are verified in Resend (see README). Follow the Resend agent skill in `.agents/skills/resend` rather than recalling its API.
- The RAG legend ("Action Required" / "Cautionary Level" / "Optimal Air Quality") under 1.2 Kaiterra Monitoring was removed at the owner's request (12 Oct 2026); don't re-add it.
- The empty rule under the 05 text column is reserved for a partner quote. The "Inside Air Intelligence" agent row was removed at the owner's request (12 Oct 2026); don't re-add it.
- 3D art (`public/art/air-ribbon-loop.webp`, one file for hero and closing) is our own three.js render. Regenerate it with `scripts/air-ribbon/` (see README). The header uses the **full logo** with its tagline "Biosecurity - Breathe Better" (owner request 12 Oct 2026): `public/brand/sas-logo.png`, or `sas-logo-white.png` on dark pages. These are the V2 colour and white files from `../logo-assets`. The mark alone (`sas-mark.png`, cropped without the tagline) is only used in the section 05 loop and the favicon.

## Design direction
- Style reference: fin.ai. The element library is `docs/design-library/fin-ai.md`; refer to elements by ID (e.g. `C-07`). §9 maps elements to our sections. Use Fin's patterns, never Fin's copy, logos or 3D assets.
- Light theme only. No dark mode.
- Minimal, modern, "AI-native" feel. Generous whitespace, thin borders.
- No scroll-triggered animations, parallax, marquees, carousels or auto-playing motion. Small hover states are fine. **Exceptions (owner requests), all respecting reduced motion:** the section 05 loop diagram; the section numbers rolling in once on scroll (`rolling-number.tsx`, copied from fin.ai: masked digits rise 1em and fade in, 1s/0.8s, 80ms stagger, trigger at 12% above viewport bottom); and the liquid ribbon (`liquid-ribbon.tsx` + `src/lib/air-ribbon-scene.ts`): the hero and closing render is the static WebP first, then a live three.js copy of the same scene fades in and ripples slowly (12s seamless loop, frame 0 = the WebP). three.js loads only when a ribbon is near the viewport; it runs at 30fps only while on screen, pauses in background tabs, caps canvas resolution at 2× / 2.4 megapixels, and falls back to the static image for reduced motion, no WebGL2 or a lost GPU context. If the WebP is ever re-rendered, update the constants at the top of `air-ribbon-scene.ts` to match (colours, rotation, 3000px frame and the trim box).
- Keep scrolling short. Few sections, nothing padded out.
- Mobile-first and accessible: semantic headings, AA contrast.

## Commands
- `pnpm dev`: local dev server
- `pnpm build`: production build (run before committing)
- `pnpm lint`: ESLint
