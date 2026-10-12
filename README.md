# Sterilised Air Solutions: Landing Page

Minimal, light-themed one-page site for Sterilised Air Solutions (Zero Capex IoT air sterilisation for UK care homes).

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · pnpm
- **Hosting:** Vercel (zero-config Next.js)

## Structure

```
docs/
  knowledge-base.md      # Business facts + verbatim copy in order + copy notes
  reference/source.html  # Original HTML the content was extracted from
src/
  content/site.ts        # Single source of truth for all page copy
  app/
    layout.tsx           # Metadata (title, lang en-GB), fonts
    page.tsx             # The landing page
    globals.css          # Light-only design tokens
```

## Develop

```bash
pnpm install
pnpm dev
```

## Deploy to Vercel

```bash
vercel link
vercel deploy
```

Or import the Git repository in the Vercel dashboard. No configuration is needed.
