import { Halftone } from "@/components/ui";
import { md } from "@/lib/site";
import styles from "./MdPortrait.module.css";

/**
 * Placeholder figure (head and shoulders in a suit) shown until a real photo of the
 * Managing Director is added. To use a photo, put it in assets/photos, run `npm run images`
 * and render it here with <Photo name="..." fill /> inside .person.
 */
function PersonSilhouette() {
  return (
    <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMax meet" className={styles.silhouette} aria-hidden>
      <defs>
        <linearGradient id="md-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="md-suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Neck */}
      <path d="M170 228h60v52c0 14-13 26-30 26s-30-12-30-26z" fill="url(#md-skin)" />
      {/* Head */}
      <ellipse cx="200" cy="160" rx="72" ry="86" fill="url(#md-skin)" />
      {/* Jacket */}
      <path d="M40 460c0-92 38-150 108-170l52 70 52-70c70 20 108 78 108 170z" fill="url(#md-suit)" />
      {/* Shirt and tie */}
      <path d="M148 290l52 70 52-70-14-6-38 50-38-50z" fill="#fff" fillOpacity="0.22" />
      <path d="M190 338l10-10 10 10-6 40h-8z" fill="#c8202b" fillOpacity="0.55" />
    </svg>
  );
}

/** The Managing Director in an arched, red-lit frame, with a small caption card. */
export function MdPortrait({ className }: { className?: string }) {
  return (
    <figure className={`${styles.portrait} ${className ?? ""}`}>
      <div aria-hidden className={styles.outline} />
      <div className={styles.arch} role="img" aria-label={`${md.name}, ${md.title} of Henna Enterprises`}>
        <Halftone tone="light" from="fromTopRight" className={styles.dots} />
        <div className={styles.person}>
          <PersonSilhouette />
        </div>
      </div>
      <figcaption className={styles.card}>
        <span className={styles.cardTitle}>{md.title}</span>
        <span className={styles.cardText}>Henna Enterprises, Kathmandu</span>
      </figcaption>
    </figure>
  );
}
