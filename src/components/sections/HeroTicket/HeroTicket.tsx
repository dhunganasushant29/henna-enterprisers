import { Photo } from "@/components/ui";
import type { ImageName } from "@/data/images";
import { site } from "@/lib/site";
import styles from "./HeroTicket.module.css";

type Props = {
  /** `flip` mirrors the photo, e.g. to move the main subject away from the ticket. */
  photo: { name: ImageName; alt: string; focus?: string; flip?: boolean };
  /** Small red label at the top of the ticket. */
  label: string;
  title?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Inner-page hero visual: the page's photo in a tall rounded frame, with a cream paper
 * ticket (perforation, notches, barcode stub) overlapping it that holds the page's quick facts.
 * The photo is the hero image, so it loads first (priority) and brings its ImageObject schema.
 */
export function HeroTicket({ photo, label, title, children }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <Photo
          name={photo.name}
          alt={photo.alt}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 100vw"
          className={styles.img}
          style={{
            objectPosition: photo.focus,
            transform: photo.flip ? "scaleX(-1)" : undefined,
          }}
        />
      </div>

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
