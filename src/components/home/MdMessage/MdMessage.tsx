import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { MdPortrait } from "@/components/sections";
import { Halftone, Label } from "@/components/ui";
import { md } from "@/lib/site";
import styles from "./MdMessage.module.css";

/** Managing Director's message, in simple words, based on his message in the company profile. */
export function MdMessage() {
  return (
    <section className={styles.section} aria-labelledby="md-title">
      <Halftone tone="brand" from="fromBottomLeft" className={styles.dots} />
      <div className={styles.inner}>
        <div className={styles.layout}>
          <MdPortrait className={styles.portrait} />

          <div className={styles.text}>
            <Label dark>A word from our Managing Director</Label>
            <span aria-hidden className={styles.mark}>
              &ldquo;
            </span>
            <blockquote id="md-title" className={styles.quote}>
              <p>
                At Henna Enterprises, we believe in <em>honest and fair recruitment.</em> Our goal is to connect skilled workers
                with good companies, so that both can grow and trust each other for a long time.
              </p>
            </blockquote>

            <p className={styles.signature}>{md.name}</p>
            <p className={styles.role}>{md.title}, Henna Enterprises</p>

            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt className={styles.factName}>Experience</dt>
                <dd className={styles.factValue}>More than 10 years in recruitment</dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factName}>Background</dt>
                <dd className={styles.factValue}>Worked in the Middle East and other countries</dd>
              </div>
            </dl>

            <div className={styles.links}>
              <Link href="/about/" className={styles.readMore}>
                <span className={styles.underline}>Read the full message</span>
                <ArrowRight size={16} className={styles.arrow} aria-hidden />
              </Link>
              <a href={`mailto:${md.email}`} className={styles.email}>
                <Mail size={16} aria-hidden /> <span className={styles.underline}>{md.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
