import type { ImageName } from "./images";

/**
 * Who took each photo, used for the ImageObject schema (not shown on the page).
 * Stock photos are from Unsplash (free for commercial use under the Unsplash License).
 */
export type PhotoCredit = { author: string; page?: string; own?: boolean };

const unsplash = (author: string, id: string): PhotoCredit => ({ author, page: `https://unsplash.com/photos/${id}` });

export const photoCredits: Partial<Record<ImageName, PhotoCredit>> = {
  "construction-workers": unsplash("Zhi Gong", "LSshI6spa5E"),
  "airport-departure": unsplash("JESHOOTS.COM", "mSESwdMZr-A"),
  "kathmandu-aerial": unsplash("Alexis Rodriguez", "Tmzjv7-ELC4"),
  "kathmandu-valley": unsplash("Sashi Shrestha", "MZV2QnNyWak"),
  "factory-workers": unsplash("Remy Gieling", "KP6XQIEjjPA"),
  "security-guard": unsplash("Etienne Girardet", "vhKSJjv-yBM"),
  "hotel-chef": unsplash("Pylyp Sukhenko", "y-XZf_TNRms"),
  "interview-handshake": unsplash("Vitaly Gariev", "jEpZNyFSQwQ"),
  "employer-meeting": unsplash("Md Ishak Rahman", "MkNnPlMThgk"),
  "skill-inspection": unsplash("Toni Reed", "dSjrv4w1g1Q"),
  "airport-terminal": unsplash("Briana Tozour", "rUXh5USKfUQ"),
  "hotel-reception": unsplash("Neon Wang", "kfnWOD1Tbp8"),
  "training-briefing": unsplash("Campaign Creators", "gMsnXqILjp4"),
  "henna-office-kathmandu": { author: "Henna Enterprises", own: true },
  "md-dinesh-bhandari": { author: "Henna Enterprises", own: true },
};
