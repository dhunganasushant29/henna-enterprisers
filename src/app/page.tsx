import { AudienceSplit, HomeHero, IndustryMosaic, MdMessage, ServiceExplorer, StartJourney } from "@/components/home";
import { CtaBand, LicenceNote, LogoMarquee, OfficeList, ProcessJourney } from "@/components/sections";
import { Section, SectionHeader, TextLink } from "@/components/ui";
import { hiringSteps } from "@/data";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AudienceSplit />

      <Section bordered>
        <SectionHeader
          label="What we do"
          title="We take care of every step of hiring."
          action={<TextLink href="/services/">All services</TextLink>}
        />
        <div className={styles.explorer}>
          <ServiceExplorer />
        </div>
      </Section>

      <StartJourney />

      <Section tone="sand">
        <ProcessJourney
          steps={hiringSteps}
          header={
            <SectionHeader
              label="How hiring works"
              title="Six clear steps, approved by the Government of Nepal."
              intro="Every hire follows the same steps, approved by Nepal's Department of Foreign Employment. You always know what is happening and what is next."
            />
          }
          aside={<TextLink href="/employers/">Read the full guide for employers</TextLink>}
        />
      </Section>

      <Section tone="white">
        <SectionHeader
          label="Industries"
          title="Workers for building sites, hotels and more."
          intro="We know the skills each job needs, so the people we send are ready to start work."
          action={<TextLink href="/industries/">See all 13 industries</TextLink>}
        />
        <IndustryMosaic />
      </Section>

      <Section>
        <SectionHeader
          label="Our clients"
          title="Companies that trust us."
          intro="Some of the hotels, builders and other companies we have found workers for."
        />
        <div className={styles.marquee}>
          <div className={styles.fullBleed}>
            <LogoMarquee />
          </div>
        </div>
        <div className={styles.block}>
          <LicenceNote />
        </div>
      </Section>

      <MdMessage />

      <Section bordered>
        <SectionHeader
          label="Our offices"
          title="Our offices in Nepal, the Gulf and India."
          action={<TextLink href="/contact/">Contact us and find our office</TextLink>}
        />
        <div className={styles.boxed}>
          <OfficeList />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
