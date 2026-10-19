import { BadgeCheck } from "lucide-react";
import { FactsRow, Globe } from "@/components/sections";
import { ButtonLink, Halftone, Stars } from "@/components/ui";
import { site } from "@/lib/site";
import styles from "./HomeHero.module.css";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** Dark home hero: headline on the left, globe with our routes on the right, key figures below. */
export function HomeHero() {
  return (
    <section className={styles.hero}>
      <div aria-hidden className={styles.light} />
      <Halftone tone="brand" from="fromTopRight" className={styles.dots} />

      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.text}>
            <p className={`${styles.rise} ${styles.eyebrow}`}>Licensed manpower agency · Kathmandu, Nepal</p>
            {/* No entrance animation on the headline: it is the LCP element and must paint immediately. */}
            <h1 className={styles.title}>
              Good jobs abroad.
              <br className={styles.wideBreak} /> <em>Good people</em> for your business.
            </h1>
            <p className={`${styles.rise} ${styles.intro}`} style={stagger(1)}>
              For over {site.yearsExperience} years, Henna Enterprises has helped skilled Nepali workers find jobs with trusted
              companies in Saudi Arabia, the UAE, Kuwait and other countries. Honest contracts, careful checks, and help at every
              step.
            </p>
            <div className={`${styles.rise} ${styles.actions}`} style={stagger(2)}>
              <ButtonLink href="/employers/">Hire workers from Nepal</ButtonLink>
              <ButtonLink href="/job-seekers/" variant="outlineLight">
                Find a job abroad
              </ButtonLink>
            </div>
            <ul className={`${styles.rise} ${styles.trust}`} style={stagger(3)}>
              <li className={styles.trustItem}>
                <Stars />
                <span>
                  <strong className={styles.strong}>{site.googleRating.value}</strong> on Google
                </span>
              </li>
              <li className={styles.trustItem}>
                <BadgeCheck size={16} className={styles.badge} aria-hidden />
                Govt. Lic. No. <span className={styles.white}>{site.licence}</span>
              </li>
            </ul>
          </div>

          <figure className={`${styles.rise} ${styles.map}`} style={stagger(2)}>
            <Globe />
            <figcaption className={styles.caption}>
              <span className={styles.captionTitle}>
                <span aria-hidden className={styles.dot} />
                Where our people work
              </span>
              <span>
                <i aria-hidden className={styles.legendLine} />
                Our offices
              </span>
              <span>
                <i aria-hidden className={styles.legendDashed} />
                Client countries
              </span>
            </figcaption>
          </figure>
        </div>

        <FactsRow dark className={styles.facts} />
      </div>
    </section>
  );
}
