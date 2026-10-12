@AGENTS.md

# Sterilised Air Solutions: minimal landing page

A single-page Next.js (App Router) site deployed on Vercel.

## Content rules (non-negotiable)
- All copy lives in `src/content/site.ts`, taken verbatim from `docs/reference/source.html`.
- Keep the **exact words** and the **exact section order**: Header → Hero → The Solution Ecosystem → Proof of Concept → Global Environmental Standards → Occupancy → Footer.
- Never hard-code copy in components. Import it from `@/content/site`.
- Copy questions and flagged issues are in `docs/knowledge-base.md` §4. Don't "fix" them silently.

## Design direction
- Style reference: fin.ai. The element library is `docs/design-library/fin-ai.md`; refer to elements by ID (e.g. `C-07`). §9 maps elements to our sections. Use Fin's patterns, never Fin's copy, logos or 3D assets.
- Light theme only. No dark mode.
- Minimal, modern, "AI-native" feel. Generous whitespace, strong typography (Geist), thin borders.
- No scroll-triggered animations, parallax, marquees, carousels or auto-playing motion. Small hover states are fine.
- Keep scrolling short. Few sections, nothing padded out.
- Mobile-first and accessible: semantic headings, visible RAG labels, AA contrast.

## Commands
- `pnpm dev`: local dev server
- `pnpm build`: production build (run before committing)
- `pnpm lint`: ESLint
