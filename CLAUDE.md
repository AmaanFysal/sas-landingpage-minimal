@AGENTS.md

# Sterilised Air Solutions: minimal landing page

A single-page Next.js (App Router) site deployed on Vercel.

## Content rules (non-negotiable)
- All copy lives in `src/content/site.ts`, taken verbatim from `docs/reference/source.html`.
- Keep the **exact words** and the **exact section order**: Header → Hero → "What we deliver" band (no number) → 01 The Solution Ecosystem → 02 Proof of Concept → 03 Global Environmental Standards → 04 Occupancy → 05 Air Intelligence → Footer.
- **Sections 01–04 are CEO-approved: never change their text, order or numbering.**
- The "What we deliver" band copy (`deliver` in site.ts) was supplied by the owner (not in the source HTML). It has no section number and sits on the off-white page between the hero and the white sheet: label, 32px headline, subline, three white cards (blue `t-card` title, line, rule, muted fact) aligned with subgrid, a footnote, then a plain down-arrow linking to 01.
- Section 05 copy was supplied by the owner (not in the source HTML); it lives in `airIntelligence` in site.ts. Always write "Air Intelligence" ("SAS Air Intelligence" on first mention). **Never "AirCrew".** No extra claims, statistics or technical detail in 05.
- Never hard-code copy in components. Import it from `@/content/site`.
- Copy questions and flagged issues are in `docs/knowledge-base.md` §4. Don't "fix" them silently.
- **No added label words**, ever (no "Learn more", running headers, etc.). The owner thinks extra labels look AI-generated. **Numbers are welcome**: sections are numbered 01–04 and items 1.1, 2.1, 3.1….
- CSS `uppercase` is fine for styling, except where it would change the source's own casing (e.g. "WELL v2 ALIGNED" must keep the lowercase v).
- Top banner (`announcement` in site.ts) is reserved for announcements. It currently reuses the PoC title and links to that section. "Fully Managed Service 24/7/365" must **not** go in the banner; it sits in the nav as a status label.

## Built page (decisions made with the owner)
- Hero follows Fin's homepage (H-01): big light headline left, 3D object bottom-right.
- **Typeface: Helvetica Neue everywhere** via the system stack (`"Helvetica Neue", Helvetica, Arial`). No web fonts. Windows/Android fall back to Arial unless a Helvetica Neue web licence is bought.
- **Type sizes and text colours match the fin.ai homepage exactly** (measured at 1440px). Use the `t-*` utilities in `globals.css`: `t-display` 100/95 −4.6px light, `t-callout` 32/38.4 light (section titles and numbers), `t-body-lg` 18/25.2 black 80%, `t-card` 24, `t-title-sm` 20, `t-body` 16 black 70%, `t-quote` 24, `t-caption` 14, `t-label` 12 uppercase.
- **Container colours match the Fin homepage**: off-white `#faf9f6` page (header, hero, closing, footer); one white sheet inset 16px holding sections 01–04; chalk `#f1eee9` frames and tiles; soft sky-blue band (`bg-band-sky`, SAS logo blue, owner preference over Fin's cream) behind 02 with 70% white blurred cards; chalk-to-white quote panel for 04; 8px grey squares inside frame corners.
- Grid: 12 columns, 16px gutters, 16px page inset; content in columns 2–11 (equal left/right margins).
- **Alignment frame (owner request):** two vertical guides, mirrored left/right.
  - Outer "frame" line = middle of column 1 (`--frame` in globals.css, 16px on phones). Logo, section numbers (`num-hang`) and the footer legal line **start** on it. The status badge, the banner ×, and the hero ribbon **end** on its mirror. Use `frame-x` for any new full-width row.
  - Inner content line = column 2 start / column 11 end: headlines, body, cards, panels.
  - Surfaces (white sheet, cream band, closing crop marks) sit at the 16px page inset.
- Accent from the SAS logo: sky `#57B9FF` (squares, highlight, fills), `--sky-ink #0B74B8` for all blue text (same hue, dark enough to read). Don't introduce any other blue. Headings are Fin black `#000`, buttons `#111`.
- Highlighter phrase in Occupancy: "unprecedented marketing differentiator" (`occupancy.highlight`).
- Section 05 follows Fin's flywheel: text left, chalk rounded panel right (`loop-diagram.tsx`): STERILISE → MEASURE → LEARN → PROVE, 3s per step (pills + blue arc only). One static caption is centred underneath (`loopCaption`); the per-step captions were removed at the owner's request. Hover/focus pauses it and pills are clickable. Under `prefers-reduced-motion` it is static.
- The empty rule under the 05 text column is reserved for a partner quote. The "Inside Air Intelligence" agent row was removed at the owner's request (12 Oct 2026); don't re-add it.
- 3D art (`public/art/air-ribbon-*.webp`) is our own three.js render. Regenerate it with `scripts/air-ribbon/` (see README). The logo mark in `public/brand/` is cropped from `../logo-assets` without its tagline.

## Design direction
- Style reference: fin.ai. The element library is `docs/design-library/fin-ai.md`; refer to elements by ID (e.g. `C-07`). §9 maps elements to our sections. Use Fin's patterns, never Fin's copy, logos or 3D assets.
- Light theme only. No dark mode.
- Minimal, modern, "AI-native" feel. Generous whitespace, thin borders.
- No scroll-triggered animations, parallax, marquees, carousels or auto-playing motion. Small hover states are fine. **Exceptions (owner requests), both respecting reduced motion:** the section 05 loop diagram, and the section numbers rolling in once on scroll (`rolling-number.tsx`, copied from fin.ai: masked digits rise 1em and fade in, 1s/0.8s, 80ms stagger, trigger at 12% above viewport bottom).
- Keep scrolling short. Few sections, nothing padded out.
- Mobile-first and accessible: semantic headings, visible RAG labels, AA contrast.

## Commands
- `pnpm dev`: local dev server
- `pnpm build`: production build (run before committing)
- `pnpm lint`: ESLint
