import { BadgeCheck } from "lucide-react";
import { Halftone, Photo } from "@/components/ui";
import { site } from "@/lib/site";
import styles from "./PhotoCollage.module.css";

/** About-page hero visual: office tower in an arch, handshake photo overlapping, and key facts. */
export function PhotoCollage() {
  return (
    <div className={styles.collage}>
      <Halftone tone="brand" from="fromBottomLeft" className={styles.dots} />
      <div className={styles.main}>
        <Photo
          name="office-tower"
          alt="Glass office tower representing the international companies Henna Enterprises works with"
          fill
          priority
          sizes="(min-width: 1024px) 26rem, 70vw"
          className={styles.cover}
        />
      </div>
      <div className={styles.second}>
        <Photo
          name="handshake"
          alt="An employer and a recruiter shaking hands after agreeing a hiring plan"
          fill
          sizes="(min-width: 1024px) 18rem, 50vw"
          className={styles.cover}
        />
      </div>
      <p className={styles.badge}>
        <BadgeCheck size={16} className={styles.tick} aria-hidden /> Govt. Lic. {site.licence}
      </p>
      <div className={styles.card}>
        <p className={styles.years}>{site.yearsExperience}+ years</p>
        <p className={styles.cardText}>Helping Nepali workers find jobs abroad.</p>
      </div>
    </div>
  );
}
