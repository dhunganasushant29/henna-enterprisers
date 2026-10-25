import type { MetadataRoute } from "next";
import { services } from "@/data";
import { images, type ImageName } from "@/data/images";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Pages, with the photos shown on each (listed as an image sitemap for Google Images). */
const routes: { path: string; priority: number; photos?: ImageName[] }[] = [
  {
    path: "/",
    priority: 1,
    photos: [
      "employer-meeting",
      "airport-departure",
      "construction-workers",
      "hotel-chef",
      "security-guard",
      "factory-workers",
      "md-dinesh-bhandari",
    ],
  },
  { path: "/employers/", priority: 0.9, photos: ["employer-meeting"] },
  { path: "/job-seekers/", priority: 0.9, photos: ["airport-departure"] },
  { path: "/services/", priority: 0.8, photos: services.map((s) => s.photo.name) },
  { path: "/industries/", priority: 0.7, photos: ["construction-workers"] },
  {
    path: "/about/",
    priority: 0.7,
    photos: ["kathmandu-aerial", "henna-office-kathmandu", "kathmandu-valley", "md-dinesh-bhandari"],
  },
  { path: "/contact/", priority: 0.8, photos: ["henna-office-kathmandu"] },
  ...services.map((s) => ({
    path: `/services/${s.slug}/`,
    priority: 0.7,
    photos: [s.photo.name, ...services.filter((o) => o.slug !== s.slug).map((o) => o.photo.name)],
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
    ...(r.photos ? { images: r.photos.map((p) => absoluteUrl(`${images[p].src}-1600.webp`)) } : {}),
  }));
}
