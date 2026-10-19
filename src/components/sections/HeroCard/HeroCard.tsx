import { Halftone, Label } from "@/components/ui";
import styles from "./HeroCard.module.css";

/** Dark card for the right side of inner-page heroes. */
export function HeroCard({ label, title, children }: { label: string; title?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <Halftone tone="brand" from="fromTopRight" className={styles.dots} />
      <div className={styles.content}>
        <Label dark>{label}</Label>
        {title ? <p className={styles.title}>{title}</p> : null}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
