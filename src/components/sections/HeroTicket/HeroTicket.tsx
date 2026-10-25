import { site } from "@/lib/site";
import styles from "./HeroTicket.module.css";

type Props = {
  /** Small red label at the top of the ticket. */
  label: string;
  title?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Paper ticket for inner-page heroes, floating over the full-width hero photo. It holds the
 * page's quick facts, with a perforated tear-off stub whose notches are real cut-outs (a mask),
 * so the photo behind shows through them.
 */
export function HeroTicket({ label, title, children }: Props) {
  return (
    // The shadow lives on a wrapper (drop-shadow filter) so it follows the cut-out notches
    <div className={styles.shadow}>
      <div className={styles.ticket}>
        <div className={styles.head}>
          <p className={styles.label}>{label}</p>
          <span aria-hidden className={styles.serial}>
            Lic. {site.licence}
          </span>
        </div>
        {title ? <p className={styles.title}>{title}</p> : null}
        <div className={styles.body}>{children}</div>
        <div aria-hidden className={styles.stub}>
          <span className={styles.barcode} />
          <span className={styles.stubText}>KTM → Abroad</span>
        </div>
      </div>
    </div>
  );
}
