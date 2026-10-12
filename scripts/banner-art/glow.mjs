// Section 05's dark-band glow, made like the banner art: from our hero render
// (public/art/air-ribbon-loop.webp), so it is the same object and colours.
// The ribbon is scaled up, thrown far out of focus and faded at the edges into
// a soft light that rises from the bottom of the band (the way Fin's dark
// sections glow). Transparent, so the band's navy shows through.
// Writes public/art/band-glow.webp (1600×900).
//   node scripts/banner-art/glow.mjs [--preview file.png]
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC = path.join(root, "public/art/air-ribbon-loop.webp");
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), []));

const W = 1600;
const H = 900;
// The heart, wider than the frame and sitting low so its top curves rise into view.
const TOP = 330;
const ribbon = await sharp(await sharp(SRC).resize(1500).toBuffer())
  .extract({ left: 0, top: 0, width: 1500, height: H - TOP })
  .toBuffer();
const placed = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: ribbon, left: 50, top: TOP }])
  .png()
  .toBuffer();
const blurred = await sharp(placed).blur(70).raw().toBuffer();
// Put back the render's film grain (lost in the blur), as Fin's glows keep theirs.
for (let i = 0; i < blurred.length; i += 4) {
  const n = (Math.random() + Math.random() - 1) * 18;
  for (let c = 0; c < 3; c++) blurred[i + c] = Math.max(0, Math.min(255, blurred[i + c] + n));
}
const soft = await sharp(blurred, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
// Fade towards the top and the sides so the glow never shows a hard edge.
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>` +
    `<radialGradient id="g" cx="0.5" cy="1" r="0.75"><stop offset="0.35" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `</defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`,
);
const glow = await sharp(soft).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
await sharp(glow).webp({ quality: 82, alphaQuality: 80 }).toFile(path.join(root, "public/art/band-glow.webp"));
if (args.preview) {
  await sharp({ create: { width: W, height: H, channels: 3, background: "#04121b" } })
    .composite([{ input: glow }])
    .png()
    .toFile(args.preview);
}
