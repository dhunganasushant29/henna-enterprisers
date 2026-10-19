// Makes the logo version for dark backgrounds (public/brand/*-dark.webp):
// black and dark grey parts become off-white, the red stays red.
// Run with `node scripts/build-logo-dark.mjs` if the logo files change.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../public/brand/", import.meta.url));

for (const name of ["emblem", "word"]) {
  const { data, info } = await sharp(`${dir}${name}.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(r, g, b);
    const sat = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
    // Neutral (grey or black) pixels flip lightness; coloured (red) pixels are kept.
    if (sat < 0.25) {
      const v = 255 - Math.round((r + g + b) / 3);
      const light = Math.round(236 + (v / 255) * 14);
      data[i] = data[i + 1] = data[i + 2] = light;
      // Pale greys (anti-aliasing against white) fade out instead of glowing.
      data[i + 3] = Math.round((data[i + 3] * v) / 255);
    }
  }
  await sharp(data, { raw: info })
    .resize({ height: name === "emblem" ? 96 : 72 })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(`${dir}${name}-dark.webp`);
  console.log(`✓ ${name}-dark.webp`);
}
