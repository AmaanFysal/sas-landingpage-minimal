// Liquid-art strips for the top banner (after fin.ai's banner art), in SAS
// brand blues. Writes public/art/banner-liquid-{left,right}.webp at 2× (68px
// tall for the 34px banner) with transparent backgrounds, plus a preview PNG.
//
//   node scripts/liquid-banner/render.mjs [--seed 7] [--preview out.png]
//
// The art is a domain-warped noise field (Inigo Quilez's "warp" technique)
// shaded as a glossy surface, with marbled striations, a sharp organic edge
// facing the banner text, a cut-out swirl, and film grain.
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
  [0.0, [0x00, 0x0e, 0x16]],
  [0.22, [0x00, 0x20, 0x2e]],
  [0.48, [0x0b, 0x74, 0xb8]],
  [0.72, [0x57, 0xb9, 0xff]],
  [0.9, [0xc4, 0xe6, 0xff]],
  [1.0, [0xf2, 0xf9, 0xff]],
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
function renderStrip({ width, side, edge, holes, seed }) {
  const fbm = makeNoise(seed);
  const grain = rng(seed * 31 + 1);
  const W = width * SCALE;
  const HH = H * SCALE;
  const out = Buffer.alloc(W * HH * 4);

  // Warped liquid height field at CSS-px coordinates.
  const field = (u, v) => {
    const px = u / 300;
    const py = v / 150;
    const qx = fbm(px, py, 3);
    const qy = fbm(px + 5.2, py + 1.3, 3);
    const rx = fbm(px + 3 * qx + 1.7, py + 3 * qy + 9.2, 3);
    const ry = fbm(px + 3 * qx + 8.3, py + 3 * qy + 2.8, 3);
    return { f: fbm(px + 3 * rx, py + 3 * ry, 3), rx, ry };
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

      // Glossy shading from the field's slope.
      const c = field(u, v);
      const fx = field(u + 0.6, v).f - c.f;
      const fy = field(u, v + 0.6).f - c.f;
      const nx = -fx * 11;
      const ny = -fy * 11;
      const nl = Math.hypot(nx, ny, 1);
      const [Nx, Ny, Nz] = [nx / nl, ny / nl, 1 / nl];
      const L = [-0.45, -0.55, 0.7];
      const diffuse = Math.max(0, Nx * L[0] + Ny * L[1] + Nz * L[2]);
      const hx = L[0];
      const hy = L[1];
      const hz = L[2] + 1;
      const hl = Math.hypot(hx, hy, hz);
      const spec = Math.max(0, (Nx * hx + Ny * hy + Nz * hz) / hl) ** 36;

      // Colour: mostly deep navy/ink, with sky and pearl where the liquid folds.
      const t = smooth(-0.3, 0.7, c.f + 0.3 * c.rx);
      let [r, g, b] = palette(t);
      const shade = 0.38 + 0.72 * diffuse;
      r *= shade;
      g *= shade;
      b *= shade;

      // Marbled striations in some regions.
      const region = smooth(0.05, 0.3, fbm(u / 200 + 40, v / 100 + 12, 2));
      const stripe = Math.sin(c.f * 90 + c.ry * 12);
      const line = smooth(0.7, 1, stripe) * region;
      const dark = smooth(0.7, 1, -stripe) * region;
      r = mix(r, 0.86, line * 0.4) * (1 - dark * 0.35);
      g = mix(g, 0.94, line * 0.4) * (1 - dark * 0.35);
      b = mix(b, 1.0, line * 0.4) * (1 - dark * 0.35);

      // Specular glints and a thin bright rim along the sharp edge.
      const rim = Math.exp(-((e - 1.4) ** 2) / 1.2) * 0.35;
      r += spec * 0.9 + rim;
      g += spec * 0.95 + rim;
      b += spec + rim;

      // Film grain (monochrome).
      const n = (grain() + grain() - 1) * 0.085;
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
  left: renderStrip({ width: 500, side: "right", edge: 118, holes: [{ d: 205, y: 30, rx: 58, ry: 15 }], seed: SEED }),
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
