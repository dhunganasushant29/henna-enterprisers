import { Check } from "lucide-react";
import { Label, TextLink } from "@/components/ui";
import styles from "./AudienceSplit.module.css";

const audiences = [
  {
    label: "For employers",
    title: "Hire skilled, tested workers from Nepal who are ready to start.",
    points: ["Workers checked for your job", "We set up interviews and work tests", "We do the visa, medical check and travel"],
    href: "/employers/",
    cta: "How hiring works",
  },
  {
    label: "For job seekers",
    title: "Find a real job abroad through a licensed agency you can trust.",
    points: ["Jobs with known companies", "Your contract explained in Nepali", "Training before you fly"],
    href: "/job-seekers/",
    cta: "How to apply",
  },
];

/** Two doors: employers and job seekers, side by side. */
export function AudienceSplit() {
  return (
    <section className={styles.section} aria-label="Who we help">
      <div className={styles.inner}>
        {audiences.map((a) => (
          <div key={a.href} className={styles.door}>
            <Label>{a.label}</Label>
            <h2 className={styles.title}>{a.title}</h2>
            <ul className={styles.points}>
              {a.points.map((p) => (
                <li key={p} className={styles.point}>
                  <Check size={16} className={styles.check} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <TextLink href={a.href} className={styles.link}>
              {a.cta}
            </TextLink>
          </div>
        ))}
      </div>
    </section>
  );
}
