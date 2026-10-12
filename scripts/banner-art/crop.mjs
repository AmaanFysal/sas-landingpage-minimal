// Top-banner art, made the way fin.ai makes theirs: close-up crops of the 3D
// render (our hero ribbon, public/art/air-ribbon-loop.webp), so it is the same
// object and colours. Writes three files to public/art/:
//   banner-art-left.webp    744×68  (372 CSS px at 2×) art meets the text on its right
//   banner-art-right.webp   938×68  (469 CSS px at 2×) art meets the text on its left
//   banner-art-mobile.webp 1170×102 (390 CSS px at 3×) soft, blurred washes at both
//                           ends on the small-screen banner grey (Fin's mobile art)
//   node scripts/banner-art/crop.mjs [--preview dir]
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC = path.join(root, "public/art/air-ribbon-loop.webp");
const OUT = path.join(root, "public/art");
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), []));

const BANNER = { r: 0xe1, g: 0xe2, b: 0xe5 }; // desktop strip (art has transparency)
const BANNER_LOW = { r: 0xd9, g: 0xd9, b: 0xd9 }; // small-screen strip (Fin's #d9d9d9)

// A crop of the hero render: `x`,`y` = top-left in hero pixels, `zoom` relative
// to the hero shown at 3× (1 = the ribbon at the same size as in the hero
// strip), output `w`×`h` device pixels.
async function crop({ x, y, zoom, w, h, density }) {
  const scale = (density / 3) * zoom; // output px per hero px
  const region = { left: Math.round(x), top: Math.round(y), width: Math.round(w / scale), height: Math.round(h / scale) };
  return sharp(SRC).extract(region).resize(w, h).png().toBuffer();
}

// Crops chosen by searching the render for windows that fill the screen-edge
// end, finish in a clean sharp edge before the text, and (right piece) stay dark
// where the white × sits. Left: the sky-blue sweep. Right: the navy bulb.
const left = await crop({ x: 60, y: 720, zoom: 0.75, w: 744, h: 68, density: 2 });
const right = await crop({ x: 1080, y: 1300, zoom: 1.2, w: 938, h: 68, density: 2 });
await sharp(left).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, "banner-art-left.webp"));
await sharp(right).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, "banner-art-right.webp"));

// Mobile: soft out-of-focus washes at both ends, baked onto the small-screen grey,
// dissolving into it towards the middle (where the text sits).
const MW = 1170;
const MH = 102;
// Same two shapes, out of focus: the sky sweep (left) and the navy bulb (right).
const washL = await sharp(await crop({ x: 120, y: 700, zoom: 0.9, w: 420, h: MH, density: 3 })).blur(9).png().toBuffer();
const washR = await sharp(await crop({ x: 1560, y: 1080, zoom: 0.9, w: 420, h: MH, density: 3 })).blur(9).png().toBuffer();
const fade = (dir) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="${MH}"><defs><linearGradient id="g" x1="${dir === "l" ? 0 : 1}" x2="${dir === "l" ? 1 : 0}"><stop offset="0.45" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="420" height="${MH}" fill="url(#g)"/></svg>`,
  );
// Fin's soft art keeps the render's film grain, so add it back after the blur.
const grain = (w, h, amount = 26) => {
  const raw = Buffer.alloc(w * h * 4);
  for (let i = 0; i < raw.length; i += 4) {
    const n = 128 + (Math.random() + Math.random() - 1) * amount;
    raw[i] = raw[i + 1] = raw[i + 2] = n;
    raw[i + 3] = 255;
  }
  return sharp(raw, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
};
const faded = async (buf, dir) =>
  sharp(await sharp(buf).composite([{ input: await grain(420, MH), blend: "overlay" }]).png().toBuffer())
    .composite([{ input: fade(dir), blend: "dest-in" }])
    .png()
    .toBuffer();
await sharp({ create: { width: MW, height: MH, channels: 4, background: { ...BANNER_LOW, alpha: 1 } } })
  .composite([
    { input: await faded(washL, "l"), left: 0, top: 0 },
    { input: await faded(washR, "r"), left: MW - 420, top: 0 },
  ])
  .webp({ quality: 88 })
  .toFile(path.join(OUT, "banner-art-mobile.webp"));
console.log("wrote banner-art-left/right/mobile.webp");

// Previews of the strip at 1440 (desktop art), 900 (mobile art in 195px boxes,
// faded 48px towards the text) and 390 (mobile art across the bar).
if (args.preview) {
  const S = 2;
  const text = 369;
  const desk = await sharp({ create: { width: 1440 * S, height: 34 * S, channels: 4, background: { ...BANNER, alpha: 1 } } })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: (1440 - 469) * S, top: 0 },
      { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${text * S}" height="${34 * S}"><text x="50%" y="62%" text-anchor="middle" font-family="Helvetica" font-size="${14 * S}" fill="#111">Active Proof of Concept: West London Care Home →</text></svg>`), left: Math.round(((1440 - text) / 2) * S), top: 0 },
    ])
    .png()
    .toFile(path.join(args.preview, "banner-1440.png"));
  const mob = await sharp(path.join(OUT, "banner-art-mobile.webp")).resize(390 * S, 34 * S).png().toBuffer();
  await sharp(mob)
    .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${390 * S}" height="${34 * S}"><text x="50%" y="62%" text-anchor="middle" font-family="Helvetica" font-size="${14 * S}" fill="#111">Active Proof of Concept →</text></svg>`), left: 0, top: 0 }])
    .png()
    .toFile(path.join(args.preview, "banner-390.png"));
  console.log("previews in", args.preview, desk ? "" : "");
}
