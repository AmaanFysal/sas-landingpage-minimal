# Sterilised Air Solutions: Landing Page

Minimal, light-themed one-page site for Sterilised Air Solutions (Zero Capex IoT air sterilisation for UK care homes).

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · pnpm
- **Hosting:** Vercel (zero-config Next.js)

## Structure

```
docs/
  knowledge-base.md         # Business facts + verbatim copy in order + copy notes
  design-library/fin-ai.md  # fin.ai element library (style reference, element IDs)
  reference/source.html     # Original HTML the content was extracted from
src/
  content/site.ts           # Single source of truth for all page copy
  app/
    layout.tsx              # Metadata (title, lang en-GB), fonts
    page.tsx                # Composes the sections in source order
    globals.css             # Light-only design tokens + Fin-style utilities
    icon.png                # Favicon (SAS mark)
  components/landing/       # Header, hero, numbered sections, footer
public/
  art/                      # 3D "air ribbon" renders (our own)
  brand/sas-mark.png        # Logo mark cropped from ../logo-assets
scripts/air-ribbon/         # three.js scene used to render public/art
```

## Develop

```bash
pnpm install
pnpm dev
```

## Re-rendering the 3D art

The ribbon images are rendered from `scripts/air-ribbon/render.html` (three.js, brand colours from the logo). Shape, angle and lighting are URL parameters.

```bash
node scripts/air-ribbon/server.mjs "$PWD/scripts/air-ribbon/out" 4319
```

Open `http://localhost:4319/?shape=ribbon&size=1800&dist=6.4&env=0.8&irid=0&rough=0.14&rx=-0.6&ry=-0.5&rz=2.2&tm=neutral&sky=3cc4ff&save=air-ribbon-hero` in a browser. The PNG is saved to the `out` folder; trim it and convert it to WebP into `public/art/`. The closing image uses `rx=-1.15&ry=0.45&rz=0.9`.

## Deploy to Vercel

```bash
vercel link
vercel deploy
```

Or import the Git repository in the Vercel dashboard. No configuration is needed.
