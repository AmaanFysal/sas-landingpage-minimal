// Liquid-art strips for the top banner (after fin.ai's banner art), in SAS
// brand blues. Writes public/art/banner-liquid-{left,right}.webp at 2× (68px
// tall for the 34px banner) with transparent backgrounds, plus a preview PNG.
//
//   node scripts/liquid-banner/render.mjs [--seed 7] [--preview out.png]
//
// The art is a soft, domain-warped noise field (Inigo Quilez's "warp"
// technique) mapped to broad bands of brand blue with gentle airbrushed
// shading, a patch of fine marbled rings, a sharp organic edge facing the
// banner text with a thin light rim, a cut-out swirl, and film grain.
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const SEED = Number(args.seed ?? 7);
const SCALE = 2; // device pixels per CSS pixel
const H = 34; // banner height in CSS px

// Brand palette, dark to light (logo navy → sky-ink → sky → pearl).
const PALETTE = [
  [0.0, [0x02, 0x12, 0x1b]],
  [0.2, [0x00, 0x20, 0x2e]],
  [0.4, [0x0b, 0x64, 0x9e]],
  [0.58, [0x4c, 0xa8, 0xec]],
  [0.74, [0x8f, 0xb4, 0xcf]],
  [0.88, [0xc9, 0xdb, 0xe8]],
  [1.0, [0xe9, 0xf0, 0xf5]],
];

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const r = rng(seed);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512).map((_, i) => p[i & 255]);
  const gx = new Float32Array(256);
  const gy = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const a = r() * Math.PI * 2;
    gx[i] = Math.cos(a);
    gy[i] = Math.sin(a);
  }
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const dot = (h, x, y) => gx[h] * x + gy[h] * y;
  const noise = (x, y) => {
    const X = Math.floor(x);
    const Y = Math.floor(y);
    const xf = x - X;
    const yf = y - Y;
    const xi = X & 255;
    const yi = Y & 255;
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[xi] + yi];
    const ab = perm[perm[xi] + yi + 1];
    const ba = perm[perm[xi + 1] + yi];
    const bb = perm[perm[xi + 1] + yi + 1];
    const x1 = dot(aa, xf, yf) + u * (dot(ba, xf - 1, yf) - dot(aa, xf, yf));
    const x2 = dot(ab, xf, yf - 1) + u * (dot(bb, xf - 1, yf - 1) - dot(ab, xf, yf - 1));
    return x1 + v * (x2 - x1);
  };
  const fbm = (x, y, octaves = 5) => {
    let sum = 0;
    let amp = 0.5;
    for (let o = 0; o < octaves; o++) {
      sum += amp * noise(x, y);
      // rotate + scale between octaves to avoid grid artefacts
      const nx = 1.6 * x + 1.2 * y + 3.1;
      y = -1.2 * x + 1.6 * y + 7.7;
      x = nx;
      amp *= 0.5;
    }
    return sum;
  };
  return fbm;
}

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;

function palette(t) {
  t = Math.min(1, Math.max(0, t));
  for (let i = 1; i < PALETTE.length; i++) {
    const [p1, c1] = PALETTE[i];
    const [p0, c0] = PALETTE[i - 1];
    if (t <= p1) {
      const k = smooth(0, 1, (t - p0) / (p1 - p0));
      return c0.map((c, j) => mix(c, c1[j], k) / 255);
    }
  }
  return PALETTE.at(-1)[1].map((c) => c / 255);
}

/**
 * One strip. `side` is where the banner text is ("right" for the left piece).
 * `edge` is the CSS-px distance from the text side where the art ends.
 */
function renderStrip({ width, side, edge, holes, marble, seed }) {
  const fbm = makeNoise(seed);
  const grain = rng(seed * 31 + 1);
  const W = width * SCALE;
  const HH = H * SCALE;
  const out = Buffer.alloc(W * HH * 4);

  // Warped liquid height field at CSS-px coordinates.
  const field = (u, v) => {
    const px = u / 340;
    const py = v / 170;
    const qx = fbm(px, py, 2);
    const qy = fbm(px + 5.2, py + 1.3, 2);
    const rx = fbm(px + 2.2 * qx + 1.7, py + 2.2 * qy + 9.2, 2);
    const ry = fbm(px + 2.2 * qx + 8.3, py + 2.2 * qy + 2.8, 2);
    return { f: fbm(px + 2.2 * rx, py + 2.2 * ry, 2), rx, ry };
  };

  for (let y = 0; y < HH; y++) {
    for (let x = 0; x < W; x++) {
      const u = (x + 0.5) / SCALE;
      const v = (y + 0.5) / SCALE;
      // Distance from the text-side end, so both pieces share the same logic.
      const d = side === "right" ? width - u : u;

      // Sharp organic boundary: art where e > 0.
      const wob = 40 * fbm(u / 150 + 11, v / 46 + 3, 2) + 16 * Math.sin(v / 11 + u / 90);
      let e = d - edge + wob;
      for (const h of holes) {
        const hx = (h.d - d) / h.rx;
        const hy = (v - h.y) / h.ry;
        const hole = (1 - Math.hypot(hx, hy)) * h.rx * 0.5 + 4 * fbm(u / 60 + 5, v / 24, 2);
        e = Math.min(e, -hole);
      }
      const alpha = smooth(-0.55, 0.55, e);
      if (alpha <= 0) continue;

      // Broad, soft bands of colour flowing through the strip.
      const c = field(u, v);
      const t = smooth(-0.42, 0.42, c.f + 0.35 * c.rx);
      let [r, g, b] = palette(1 - t);

      // Gentle airbrushed modelling: compare with a sample towards the light.
      const lit = field(u - 9, v - 6).f - c.f;
      const shade = Math.min(1.18, Math.max(0.78, 1 + 2.2 * lit));
      r *= shade;
      g *= shade;
      b *= shade;

      // A patch of fine marbled lines (Fin's agate area): contour lines of the
      // liquid itself, so they flow with it. Soft, not etched.
      if (marble) {
        const reach = Math.abs(d - marble.d) + 30 * fbm(u / 140 + 9, v / 40 + 4, 2);
        const inside = 1 - smooth(marble.r * 0.5, marble.r, reach);
        if (inside > 0) {
          const ring = 0.5 + 0.5 * Math.sin(c.f * 150 + c.ry * 24);
          const [mr, mg, mb] = palette(0.5 + 0.34 * ring);
          r = mix(r, mr * shade, inside * 0.65);
          g = mix(g, mg * shade, inside * 0.65);
          b = mix(b, mb * shade, inside * 0.65);
        }
      }

      // A thin light rim just inside the sharp edge.
      const rim = Math.exp(-((e - 1.3) ** 2) / 0.9) * 0.22;
      r += rim * 0.75;
      g += rim * 0.9;
      b += rim;

      // Film grain (monochrome).
      const n = (grain() + grain() - 1) * 0.075;
      const i = (y * W + x) * 4;
      out[i] = Math.round(Math.min(1, Math.max(0, r + n)) * 255);
      out[i + 1] = Math.round(Math.min(1, Math.max(0, g + n)) * 255);
      out[i + 2] = Math.round(Math.min(1, Math.max(0, b + n)) * 255);
      out[i + 3] = Math.round(alpha * 255);
    }
  }
  return { data: out, width: W, height: HH };
}

const pieces = {
  left: renderStrip({
    width: 500,
    side: "right",
    edge: 118,
    holes: [{ d: 205, y: 30, rx: 58, ry: 15 }],
    marble: { d: 470, y: 10, r: 120 },
    seed: SEED,
  }),
  right: renderStrip({ width: 600, side: "left", edge: 132, holes: [{ d: 455, y: 2, rx: 38, ry: 12 }], seed: SEED + 101 }),
};

for (const [name, img] of Object.entries(pieces)) {
  const file = path.join(root, "public/art", `banner-liquid-${name}.webp`);
  await sharp(img.data, { raw: { width: img.width, height: img.height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(file);
  console.log("wrote", path.relative(root, file));
}

// Preview: both pieces on the banner grey, as at 1440px wide.
if (args.preview) {
  const W = 1440 * SCALE;
  const bg = { r: 0xe1, g: 0xe2, b: 0xe5, alpha: 1 };
  const left = pieces.left;
  const right = pieces.right;
  const text = 330 * SCALE;
  const sideW = (W - text) / 2;
  const leftCrop = Math.min(left.width, Math.round(sideW));
  const rightCrop = Math.min(right.width, Math.round(sideW));
  const raw = (img) => sharp(img.data, { raw: { width: img.width, height: img.height, channels: 4 } });
  await sharp({ create: { width: W, height: H * SCALE, channels: 4, background: bg } })
    .composite([
      { input: await raw(left).extract({ left: left.width - leftCrop, top: 0, width: leftCrop, height: left.height }).png().toBuffer(), left: Math.round(sideW - leftCrop), top: 0 },
      { input: await raw(right).extract({ left: 0, top: 0, width: rightCrop, height: right.height }).png().toBuffer(), left: Math.round(sideW + text), top: 0 },
    ])
    .png()
    .toFile(args.preview);
  console.log("preview", args.preview);
}
