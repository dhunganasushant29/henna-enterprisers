const WIDTHS = [256, 384, 640, 828, 1080, 1600];

/**
 * Maps a logical image name ("/img/handshake") to the pre-generated WebP
 * variant that is closest to (but not smaller than) the requested width.
 * Small fixed-size assets (logos) bypass the loader with `unoptimized`.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/img/")) return src;
  const w = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  // Photos live in /public, so they need the site's sub-folder in front (GitHub Pages).
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}-${w}.webp`;
}
