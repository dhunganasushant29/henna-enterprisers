import { Halftone, Photo } from "@/components/ui";
import { md } from "@/lib/site";
import styles from "./MdPortrait.module.css";

/** The Managing Director's photo in an arched, red-lit frame, with a small caption card. */
export function MdPortrait({ className }: { className?: string }) {
  return (
    <figure className={`${styles.portrait} ${className ?? ""}`}>
      <div aria-hidden className={styles.outline} />
      <div className={styles.arch}>
        <div className={styles.person}>
          <Photo
            name="md-dinesh-bhandari"
            alt={`${md.name}, ${md.title} of Henna Enterprises, at his desk in the Kathmandu office`}
            fill
            sizes="(min-width: 1024px) 26rem, 90vw"
          />
        </div>
        <div aria-hidden className={styles.shade} />
        <Halftone tone="light" from="fromTopRight" className={styles.dots} />
      </div>
      <figcaption className={styles.card}>
        <span className={styles.cardTitle}>{md.title}</span>
        <span className={styles.cardText}>Henna Enterprises, Kathmandu</span>
      </figcaption>
    </figure>
  );
}
