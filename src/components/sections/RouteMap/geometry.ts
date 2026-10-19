import { CITY_POINTS, MAP_SIZE } from "@/data/map";

export type CityKey = keyof typeof CITY_POINTS;
export type LabelAlign = "left" | "right" | "below" | "above";

export const destinations: { key: CityKey; label: string; office?: boolean; align: LabelAlign }[] = [
  { key: "sharjah", label: "Sharjah", office: true, align: "below" },
  { key: "jubail", label: "Al Jubail", office: true, align: "left" },
  { key: "mumbai", label: "Mumbai", office: true, align: "below" },
  { key: "kuwait", label: "Kuwait", align: "above" },
  { key: "makkah", label: "Makkah", align: "below" },
];

export const origin = CITY_POINTS.kathmandu;

/** Quadratic curve from Kathmandu to a city, bowed upward like a flight path. */
export function arc(to: readonly number[]) {
  const [x1, y1] = origin;
  const [x2, y2] = to;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - dist * 0.28;
  return `M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}

/** Position as a percentage of the map, for HTML overlays. */
export const toPercent = ([x, y]: readonly number[]) => ({
  left: `${((x / MAP_SIZE.width) * 100).toFixed(2)}%`,
  top: `${((y / MAP_SIZE.height) * 100).toFixed(2)}%`,
});
