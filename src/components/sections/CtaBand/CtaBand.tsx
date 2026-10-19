import { Phone } from "lucide-react";
import { ButtonLink, Halftone, Label } from "@/components/ui";
import { site } from "@/lib/site";
import styles from "./CtaBand.module.css";

type Props = { title?: React.ReactNode; body?: string };

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({
  title = (
    <>
      Let&apos;s talk about <em>what you need.</em>
    </>
  ),
  body = "If you want to hire workers or find a job abroad, the best first step is to talk to us. Call us, email us, or visit our office in Tokha.",
}: Props) {
  return (
    <section className={styles.band}>
      <Halftone tone="brand" from="fromBottomRight" className={styles.dots} />
      <div className={styles.inner}>
        <div className={styles.text}>
          <Label dark>Contact us</Label>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
        </div>
        <div className={styles.actions}>
          <ButtonLink href="/contact/" variant="primary">
            Talk to our team
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="outlineLight" icon={<Phone size={16} aria-hidden />}>
            {site.phone.intl}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
