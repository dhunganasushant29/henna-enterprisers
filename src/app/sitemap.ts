import type { MetadataRoute } from "next";
import { services } from "@/data";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/employers/", priority: 0.9 },
  { path: "/job-seekers/", priority: 0.9 },
  { path: "/services/", priority: 0.8 },
  { path: "/industries/", priority: 0.7 },
  { path: "/about/", priority: 0.7 },
  { path: "/contact/", priority: 0.8 },
  ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.7 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
