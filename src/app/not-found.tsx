import type { Metadata } from "next";
import { ButtonLink, Halftone, Label } from "@/components/ui";
import styles from "./not-found.module.css";

// No canonical on the 404 page (the layout's points at the home page), and keep it out of search.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className={styles.section}>
      <Halftone tone="brand" from="fromTopRight" className={styles.dots} />
      <div className={styles.inner}>
        <Label>Error 404</Label>
        <h1 className={styles.title}>We could not find that page.</h1>
        <p className={styles.lead}>This page does not exist or has moved.</p>
        <div className={styles.actions}>
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact/" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
