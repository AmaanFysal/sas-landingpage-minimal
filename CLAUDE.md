@AGENTS.md

# Sterilised Air Solutions: minimal landing page

A single-page Next.js (App Router) site deployed on Vercel.

## Content rules (non-negotiable)
- All copy lives in `src/content/site.ts`, taken verbatim from `docs/reference/source.html`.
- Keep the **exact words** and the **exact section order**: Header → Hero → The Solution Ecosystem → Proof of Concept → Global Environmental Standards → Occupancy → Footer.
- Never hard-code copy in components. Import it from `@/content/site`.
- Copy questions and flagged issues are in `docs/knowledge-base.md` §4. Don't "fix" them silently.
- **No added label words**, ever (no "Learn more", running headers, etc.). The owner thinks extra labels look AI-generated. **Numbers are welcome**: sections are numbered 01–04 and items 1.1, 2.1, 3.1….
- CSS `uppercase` is fine for styling, except where it would change the source's own casing (e.g. "WELL v2 ALIGNED" must keep the lowercase v).
- Top banner (`announcement` in site.ts) is reserved for announcements. It currently reuses the PoC title and links to that section. "Fully Managed Service 24/7/365" must **not** go in the banner; it sits in the nav as a status label.

## Built page (decisions made with the owner)
- Hero follows Fin's homepage (H-01): big light serif headline left, 3D object bottom-right.
- Accent colours come from the SAS logo: sky `#57B9FF`, navy `#00202E` (used as ink). `--sky-ink #0B74B8` for accent text.
- Fonts: Newsreader 300 (display), Geist (body), Geist Mono (labels).
- Highlighter phrase in Occupancy: "unprecedented marketing differentiator" (`occupancy.highlight`).
- 3D art (`public/art/air-ribbon-*.webp`) is our own three.js render. Regenerate it with `scripts/air-ribbon/` (see README). The logo mark in `public/brand/` is cropped from `../logo-assets` without its tagline.

## Design direction
- Style reference: fin.ai. The element library is `docs/design-library/fin-ai.md`; refer to elements by ID (e.g. `C-07`). §9 maps elements to our sections. Use Fin's patterns, never Fin's copy, logos or 3D assets.
- Light theme only. No dark mode.
- Minimal, modern, "AI-native" feel. Generous whitespace, strong typography, thin borders.
- No scroll-triggered animations, parallax, marquees, carousels or auto-playing motion. Small hover states are fine.
- Keep scrolling short. Few sections, nothing padded out.
- Mobile-first and accessible: semantic headings, visible RAG labels, AA contrast.

## Commands
- `pnpm dev`: local dev server
- `pnpm build`: production build (run before committing)
- `pnpm lint`: ESLint
