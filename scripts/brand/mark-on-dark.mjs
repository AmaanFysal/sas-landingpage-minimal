// Section 05's mark for dark backgrounds: the logo's navy strokes turned white,
// the sky-blue arc kept, edges (alpha) untouched. Writes public/brand/sas-mark-on-dark.png.
//   node scripts/brand/mark-on-dark.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const { data, info } = await sharp(path.join(root, "public/brand/sas-mark.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  // Navy (dark, low blue) becomes white; the sky arc (bright blue) stays as it is.
  if (b < 150 && 0.2126 * r + 0.7152 * g + 0.0722 * b < 110) data[i] = data[i + 1] = data[i + 2] = 255;
}
await sharp(data, { raw: info }).png().toFile(path.join(root, "public/brand/sas-mark-on-dark.png"));
