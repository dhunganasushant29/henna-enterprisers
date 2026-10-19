import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sub-folder for GitHub Pages ("/henna-enterprisers"); empty on a custom domain. See src/lib/site.ts.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Images are pre-optimised into fixed WebP widths (see src/lib/image-loader.ts),
    // so the static export never needs an image server.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1600],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
