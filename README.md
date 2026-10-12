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
  art/air-ribbon-loop.webp     # The 3D "air ribbon" render (our own), used in hero and closing
  brand/sas-logo*.png       # Full logo with tagline (colour + white), from ../logo-assets V2
  brand/sas-mark.png        # Mark only (section 05 loop), cropped from ../logo-assets
scripts/air-ribbon/         # three.js scene used to render public/art
src/lib/air-ribbon-scene.ts # Live (animated) version of the same render, loaded on demand
scripts/banner-art/         # Crops the top banner's art from the hero render (public/art/banner-art-*.webp)
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

Open this URL in a browser to render the single ribbon used in both the hero and the closing block (satin, grainy metal; add `finish=gloss` for the original glossy look):

`http://localhost:4319/?shape=ribbon&size=3000&dist=6.4&env=1.3&keylight=2.6&metal=0.75&rough=0.32&bump=0.9&film=0.1&grainPx=3&rx=-0.6&ry=-0.5&rz=2.2&tm=neutral&sky=3cc4ff&save=air-ribbon`

The PNG is saved to the `out` folder. Trim it, add 40px transparent padding and save it as WebP (quality 90) to `public/art/air-ribbon-loop.webp`. The script can also render zoomed crops (`w`, `h`, `full`, `ox`, `oy`), but the site crops with CSS instead.

The page also animates this render live (a slow liquid ripple) with `src/lib/air-ribbon-scene.ts`, a port of the same scene. Its first frame matches the WebP exactly, so if you re-render with different parameters, update the constants at the top of that file (colours, rotation, the 3000px frame and the trim box `IMG`) so the static image and the live version still line up. Visitors with reduced motion, or without WebGL2, see the WebP only.

## Re-making the banner art

The top banner's art is made the way fin.ai makes theirs: close-up crops of the 3D render (our hero ribbon, `public/art/air-ribbon-loop.webp`), so it is the same object and colours. The crop windows are set at the top of the script. To regenerate after re-rendering the ribbon, run:

```bash
node scripts/banner-art/crop.mjs --preview /tmp
```

It writes three files to `public/art`:

- `banner-art-left.webp`: 744×68px, the sky-blue sweep, for widths from 1024px.
- `banner-art-right.webp`: 938×68px, the navy bulb, dark under the white ×.
- `banner-art-mobile.webp`: 1170×102px, the same shapes soft and grainy on the darker grey, used below 1024px.

## Contact and waitlist forms

`/contact` and `/waitlist` email each submission to info@sterilisedairsolutions.co.uk through [Resend](https://resend.com), installed from the Vercel Marketplace on the project `sas-b131/sas-landingpage-minimal` (free plan, `eu-west-1`). Vercel provides two environment variables, `RESEND_API_KEY` and `RESEND_EMAIL_DOMAIN`. To get them locally, run:

```bash
vercel env pull
```

Emails are sent from `forms@sterilisedairsolutions.co.uk`, so the domain must be verified in Resend first. Its DNS is at GoDaddy (email runs on Microsoft 365). Add these three records there; none of them touches the existing email setup:

| Type | Name (host) | Value | Priority |
| --- | --- | --- | --- |
| TXT | `resend._domainkey` | the DKIM key shown in Resend (starts `p=MIGf…`) | |
| MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | |

Then press **Verify** for the domain in Resend: open it from the Vercel dashboard under Integrations → Resend. Until then, a submission shows a message asking the visitor to email info@ directly.

## Deploy to Vercel

```bash
vercel link
vercel deploy
```

Or import the Git repository in the Vercel dashboard. No configuration is needed.
