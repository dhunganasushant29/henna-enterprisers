import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Building2, Check } from "lucide-react";
import { Label, Photo } from "@/components/ui";
import { industries } from "@/data";
import type { ImageName } from "@/data/images";
import { site } from "@/lib/site";
import styles from "./AudienceSplit.module.css";

type Door = {
  id: string;
  label: string;
  title: string;
  points: string[];
  href: string;
  cta: string;
  /** Short fact in the top-right pill. */
  fact: { icon: typeof Check; text: string };
  photo: { name: ImageName; alt: string; focus: string };
};

const doors: Door[] = [
  {
    id: "employers",
    label: "For employers",
    title: "Hire skilled, tested workers from Nepal who are ready to start.",
    points: ["Workers checked for your job", "Interviews and work tests", "Visa, medical check and travel"],
    href: "/employers/",
    cta: "How hiring works",
    fact: { icon: Building2, text: `${industries.length} industries` },
    photo: {
      name: "employer-meeting",
      alt: "An employer and a recruiter smiling and shaking hands across an office desk",
      focus: "40% 35%",
    },
  },
  {
    id: "job-seekers",
    label: "For job seekers",
    title: "Find a real job abroad through a licensed agency you can trust.",
    points: ["Jobs with known companies", "Contract explained in Nepali", "Training before you fly"],
    href: "/job-seekers/",
    cta: "How to apply",
    fact: { icon: BadgeCheck, text: `Govt. Lic. ${site.licence}` },
    photo: {
      name: "airport-departure",
      alt: "A traveller with his bag at an airport gate, watching a plane take off",
      focus: "62% 30%",
    },
  },
];

const ringText = `Henna Enterprises · Kathmandu · ${site.yearsExperience}+ years · `;

/**
 * "Choose your path": two immersive photo doors, employers and job seekers, joined by a
 * round "or" badge with a slowly turning ring of text. Each whole card is one link.
 */
export function AudienceSplit() {
  return (
    <section className={styles.section} aria-labelledby="who-we-help">
      <div className={styles.inner}>
        <header className={styles.head}>
          <Label>Who we help</Label>
          <h2 id="who-we-help" className={styles.heading}>
            Are you hiring, or <em>looking for work?</em>
          </h2>
        </header>

        <div className={styles.doors}>
          {doors.map((d) => (
            <article key={d.id} className={styles.door} aria-labelledby={`door-${d.id}`}>
              <div className={styles.media}>
                <Photo
                  name={d.photo.name}
                  alt={d.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className={styles.img}
                  style={{ objectPosition: d.photo.focus }}
                />
              </div>
              <div aria-hidden className={styles.shade} />

              <div className={styles.top}>
                <span className={styles.label}>{d.label}</span>
                <span className={styles.fact}>
                  <d.fact.icon size={14} aria-hidden /> {d.fact.text}
                </span>
              </div>

              <div className={styles.body}>
                <h3 id={`door-${d.id}`} className={styles.title}>
                  {d.title}
                </h3>
                <ul className={styles.points}>
                  {d.points.map((p) => (
                    <li key={p} className={styles.point}>
                      <Check size={14} aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
                {/* The link covers the whole card (see .cta::after), so the card is one big target */}
                <Link href={d.href} className={styles.cta}>
                  {d.cta}
                  <span aria-hidden className={styles.ctaIcon}>
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </div>
            </article>
          ))}

          {/* Where the two doors meet */}
          <div aria-hidden className={styles.or}>
            <svg viewBox="0 0 120 120" className={styles.ring}>
              <defs>
                <path id="or-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#or-ring" textLength="289">
                  {ringText}
                </textPath>
              </text>
            </svg>
            <span className={styles.orWord}>or</span>
          </div>
        </div>
      </div>
    </section>
  );
}
