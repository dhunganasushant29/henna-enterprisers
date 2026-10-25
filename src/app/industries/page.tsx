import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, HeroTicket, LogoMarquee, PageHero } from "@/components/sections";
import { Label, Section, SectionHeader } from "@/components/ui";
import { clients, industries, industrySlug } from "@/data";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Industries & Job Roles We Recruit For",
  description:
    "Nepali workers for construction, hotels, security, cleaning, transport, healthcare, shops and more. See the jobs Henna Enterprises fills.",
  path: "/industries/",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image={{
          name: "construction-workers",
          alt: "Construction workers in hard hats laying steel and concrete on a building site",
          focus: "78% 35%",
        }}
        crumbs={[{ name: "Industries", path: "/industries/" }]}
        label="Industries we serve"
        title={
          <>
            Skilled people for <em>13 industries.</em>
          </>
        }
        intro="We know these industries and the skills each job needs. So the workers we send are ready to start from day one."

        aside={
          <HeroTicket label="At a glance" title="The right worker for every job.">
            <dl className={styles.stats}>
              {[
                [String(industries.length), "industries"],
                [`${industries.reduce((n, i) => n + i.roles.length, 0)}+`, "common jobs"],
                [`${Math.floor(clients.length / 10) * 10}+`, "client companies"],
              ].map(([v, k]) => (
                <div key={k} className={styles.stat}>
                  <dd className={styles.statValue}>{v}</dd>
                  <dt className={styles.statName}>{k}</dt>
                </div>
              ))}
            </dl>
            <Link href="/contact/" className={styles.ask}>
              <span className={styles.underline}>Ask about a job</span>
              <ArrowRight size={16} className={styles.askArrow} aria-hidden />
            </Link>
          </HeroTicket>
        }
      />

      <Section defer={false}>
        <ol className={styles.list}>
          {industries.map((ind, i) => (
            <li key={ind.name} id={industrySlug(ind.name)} className={styles.row}>
              <span aria-hidden className={styles.num}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className={styles.name}>{ind.name}</h2>
              <ul className={styles.roles} aria-label={`Typical roles in ${ind.name}`}>
                {ind.roles.map((r) => (
                  <li key={r} className={styles.role}>
                    {r}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className={styles.more}>
          <Label>Something else?</Label>
          <p className={styles.moreText}>
            These are the jobs we fill most often. If you need a job that is not on this list, tell us. We will tell you honestly
            if we can help.
          </p>
        </div>
      </Section>

      <Section tone="white" bordered>
        <SectionHeader label="Our clients" title="Hotels, builders, oil and steel companies." />
        <div className={styles.marquee}>
          <div className={styles.fullBleed}>
            <LogoMarquee />
          </div>
        </div>
      </Section>

      <CtaBand
        title={
          <>
            Tell us the jobs. <em>We will find the workers.</em>
          </>
        }
      />
    </>
  );
}
