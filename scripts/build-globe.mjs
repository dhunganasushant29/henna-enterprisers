// Generates the land dots for the home-page globe.
// Points are spread evenly over the sphere (Fibonacci lattice) and kept if they fall on land.
// Output: public/globe/points.bin — Int16 triples [lat*100, lon*100, flag].
// flag: 0 land, 1 Nepal (home), 2 office country, 3 client country.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const world = JSON.parse(readFileSync(here("../node_modules/world-atlas/countries-50m.json")));
const land = JSON.parse(readFileSync(here("../node_modules/world-atlas/land-50m.json")));
const landShape = feature(land, land.objects.land);
const countries = feature(world, world.objects.countries).features;

const flags = { 524: 1, 784: 2, 682: 2, 356: 2, 414: 3 }; // Nepal, UAE, Saudi Arabia, India, Kuwait
const special = countries.filter((c) => flags[Number(c.id)]);

const N = 22000;
const golden = Math.PI * (3 - Math.sqrt(5));
const out = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((i * golden) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * (180 / Math.PI) - 180;
  if (lat < -60) continue; // skip Antarctica: it only adds noise at the bottom of the globe
  const p = [lon, lat];
  if (!geoContains(landShape, p)) continue;
  const c = special.find((f) => geoContains(f, p));
  out.push(Math.round(lat * 100), Math.round(lon * 100), c ? flags[Number(c.id)] : 0);
}

mkdirSync(here("../public/globe/"), { recursive: true });
const buf = Buffer.from(new Int16Array(out).buffer);
writeFileSync(here("../public/globe/points.bin"), buf);
console.log(`${out.length / 3} land points, ${(buf.length / 1024).toFixed(1)} KB`);
