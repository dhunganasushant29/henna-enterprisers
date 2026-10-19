import type { MetadataRoute } from "next";
import { asset, site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: asset("/"),
    scope: asset("/"),
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#d81e2a",
    icons: [{ src: asset("/icon.png"), sizes: "512x512", type: "image/png" }],
  };
}
