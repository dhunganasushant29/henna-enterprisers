import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data";
import { CtaBand, HeroTicket, PageHero, ServiceIndex } from "@/components/sections";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Recruitment, Visa & Travel Services",
  description:
    "Recruitment, skill tests, visa and tickets, hotel internships and training before travel. All manpower services from one licensed agency in Kathmandu.",
  path: "/services/",
});

const reasons = [
  {
    title: "One team, from start to end",
    body: "Your workers are not passed from agent to agent. The same team chooses them and sees them onto the plane.",
  },
  {
    title: "Licensed by the government",
    body: "Every hire is approved by Nepal's Department of Foreign Employment, and you get the papers to show it.",
  },
  {
    title: "Close to you abroad",
    body: "We have offices in the UAE and Saudi Arabia, so help is near when your workers arrive.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image={{
          name: "airport-terminal",
          alt: "Travellers with luggage walking through a sunlit airport terminal",
          focus: "55% 50%",
        }}
        crumbs={[{ name: "Services", path: "/services/" }]}
        label="Our services"
        title={
          <>
            One team for <em>every step.</em>
          </>
        }
        intro="You do not need many different agents to hire one worker. We choose and test the workers, prepare the papers and book the travel. You deal with just one team."

        aside={
          <HeroTicket label="Our services">
            <ol className={styles.menu}>
              {services.map((s, i) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className={styles.menuLink}>
                    <span className={styles.menuNum}>0{i + 1}</span>
                    <span className={styles.menuTitle}>{s.title}</span>
                    <ArrowRight size={16} className={styles.menuArrow} aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </HeroTicket>
        }
      >
        <ButtonLink href="/contact/">Talk to us</ButtonLink>
        <ButtonLink href="/employers/" variant="outlineLight">
          Guide for employers
        </ButtonLink>
      </PageHero>

      <Section defer={false}>
        <SectionHeader label="Five services" title="Choose a service to read more." />
        <div className={styles.index}>
          <ServiceIndex />
        </div>
      </Section>

      <Section tone="white" bordered>
        <SectionHeader label="Why one team" title="Easier for you, safer for your workers." />
        <ul className={styles.reasons}>
          {reasons.map((r, i) => (
            <li key={r.title} className={styles.reason}>
              <span className={styles.reasonNum}>0{i + 1}</span>
              <h3 className={styles.reasonTitle}>{r.title}</h3>
              <p className={styles.reasonBody}>{r.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
