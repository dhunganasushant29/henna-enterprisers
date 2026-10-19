/** Places shown on the globe. Coordinates are [latitude, longitude]. */
export type Place = { name: string; lat: number; lon: number; kind: "home" | "office" | "client" };

export const HOME: Place = { name: "Kathmandu", lat: 27.71, lon: 85.32, kind: "home" };

export const DESTINATIONS: Place[] = [
  { name: "Sharjah", lat: 25.35, lon: 55.41, kind: "office" },
  { name: "Al Jubail", lat: 27.0, lon: 49.66, kind: "office" },
  { name: "Mumbai", lat: 19.08, lon: 72.88, kind: "office" },
  { name: "Kuwait", lat: 29.38, lon: 47.98, kind: "client" },
  { name: "Makkah", lat: 21.42, lon: 39.83, kind: "client" },
];

/** The fixed view: centred between Nepal and the Gulf. */
export const FOCUS = { lon: 63, lat: 28 };
