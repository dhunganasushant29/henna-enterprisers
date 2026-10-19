import { Check } from "lucide-react";
import { BoardingPass } from "@/components/sections";
import { Halftone, Label } from "@/components/ui";
import styles from "./StartJourney.module.css";

const points = [
  "Visit our office in Tokha-9, Kathmandu",
  "Call us, or send a WhatsApp message",
  "We explain everything in simple Nepali",
];

/** Dark band on the home page: a short invitation on the left, the boarding pass on the right. */
export function StartJourney() {
  return (
    <section className={styles.section} aria-labelledby="start-journey-title">
      <div aria-hidden className={styles.glow} />
      <Halftone tone="brand" from="fromTopRight" className={styles.dots} />
      <div className={styles.inner}>
        <div className={styles.text}>
          <Label dark>Start here</Label>
          <h2 id="start-journey-title" className={styles.title}>
            Your next job abroad <em>starts with one call.</em>
          </h2>
          <p className={styles.intro}>
            Whether you are looking for work or looking for workers, talk to us first. Our team will listen, answer your questions
            and tell you honestly what is possible.
          </p>
          <ul className={styles.points}>
            {points.map((p) => (
              <li key={p} className={styles.point}>
                <Check size={16} className={styles.check} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <BoardingPass surface="dark" className={styles.pass} />
      </div>
    </section>
  );
}
