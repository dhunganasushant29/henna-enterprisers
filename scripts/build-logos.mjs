// Makes the grey client logos used in the marquee (public/clients/grey/).
// Baking the grey in once is much cheaper than a CSS grayscale filter on every moving logo.
// Run with `npm run logos` after adding or replacing a logo in public/clients.
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const SRC = here("../public/clients/");
const OUT = here("../public/clients/grey/");

await mkdir(OUT, { recursive: true });
for (const file of (await readdir(SRC)).filter((f) => f.endsWith(".webp"))) {
  await sharp(path.join(SRC, file)).grayscale().webp({ quality: 85, alphaQuality: 90 }).toFile(path.join(OUT, file));
  console.log(`✓ ${file}`);
}
