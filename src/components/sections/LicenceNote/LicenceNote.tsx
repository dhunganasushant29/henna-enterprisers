import { ArrowUpRight } from "lucide-react";
import { Stars } from "@/components/ui";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import styles from "./LicenceNote.module.css";

/** Verifiable trust details: licence, registration and the public Google rating. */
export function LicenceNote() {
  return (
    <dl className={styles.grid}>
      <div className={styles.cell}>
        <dt className={styles.name}>Government licence</dt>
        <dd className={styles.value}>{site.licence}</dd>
        <dd className={styles.note}>{site.regulator}</dd>
      </div>
      <div className={styles.cell}>
        <dt className={styles.name}>Company registration</dt>
        <dd className={styles.value}>{site.registration}</dd>
        <dd className={styles.note}>Registered company in Kathmandu</dd>
      </div>
      <div className={styles.cell}>
        <dt className={styles.name}>Google rating</dt>
        <dd className={cn(styles.value, styles.rating)}>
          {site.googleRating.value} <Stars />
        </dd>
        <dd className={styles.note}>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.reviews}>
            Read our reviews <ArrowUpRight size={14} aria-hidden />
          </a>
        </dd>
      </div>
    </dl>
  );
}
