import { Clock, Phone } from "lucide-react";
import { CtaBand, Faq, HeroCard, PageHero, PhotoFeature, ProcessSteps } from "@/components/sections";
import { ButtonLink, Label, Section, SectionHeader, WhatsAppIcon } from "@/components/ui";
import { jobSeekerFaqs } from "@/data";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Jobs Abroad for Nepalis: How to Apply",
  description:
    "Want a job in Saudi Arabia, the UAE or Kuwait? Apply through a licensed agency in Kathmandu. See the steps, the papers to bring, and how to stay safe.",
  path: "/job-seekers/",
});

const journey = [
  { title: "Visit or call us", body: "Come to our office in Tokha or call us. Tell us about your skills and the work you want." },
  { title: "Interview and skill test", body: "If a job suits you, you meet the company and may do a short work test." },
  { title: "Medical check", body: "If you are chosen, you get a medical check at a government-approved clinic." },
  { title: "Visa and approval", body: "We send your papers for the visa and get your labour approval in Nepal." },
  { title: "Training", body: "We explain your contract, the company rules and the country's laws before you go." },
  { title: "Fly to your new job", body: "You leave with your ticket, your papers, and our phone number in case you need us." },
];

const bring = [
  { title: "Passport", body: "It should not expire soon." },
  { title: "Citizenship card", body: "The original and a photocopy." },
  { title: "Passport-size photos", body: "Recent, with a white background." },
  { title: "Certificates", body: "School, training or work certificates, if you have them." },
];

const safety = [
  `Only apply through a licensed agency. Ours is Lic. No. ${site.licence}.`,
  "Read your contract before you sign. Ask us to explain anything that is not clear.",
  "Check that the salary, job and country in your contract are the same as what you were told.",
  "Never give your passport to someone you do not know or trust.",
  "Always ask for a receipt for any payment you make.",
];

export default function JobSeekersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "For Job Seekers", path: "/job-seekers/" }]}
        label="For job seekers"
        title={
          <>
            Find a job abroad, <em>the safe way.</em>
          </>
        }
        intro={`We are a licensed agency with over ${site.yearsExperience} years of experience. We help you find real jobs with real companies, explain everything clearly, and stay with you until you land.`}
        aside={
          <HeroCard label="Not sure where to start?" title="Call us. We speak Nepali and we are happy to answer your questions.">
            <div className={styles.noteActions}>
              <a href={site.phone.href} className={styles.noteCall}>
                <Phone size={16} aria-hidden /> Call {site.phone.display}
              </a>
              <a href={site.mobile.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.noteWhatsapp}>
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </div>
            <p className={styles.noteHours}>
              <Clock size={15} aria-hidden /> {site.hours.label} · {site.address.street}
            </p>
          </HeroCard>
        }
      >
        <ButtonLink href="/contact/">Visit our office</ButtonLink>
        <ButtonLink href={site.mobile.whatsapp} variant="outline">
          Message on WhatsApp
        </ButtonLink>
      </PageHero>

      <Section defer={false}>
        <SectionHeader
          label="Step by step"
          title="From our office to your new job."
          intro="This is what happens, step by step, so you always know what comes next."
        />
        <PhotoFeature
          name="airport-departure"
          alt="A traveller with his bag at an airport gate, watching a plane take off"
          label="Your journey"
          title="From Tokha to your new job, we stay with you at every step."
          focus="70% 12%"
          className={styles.journeyPhoto}
        />
        <ProcessSteps steps={journey} className={styles.steps} />
      </Section>

      <Section tone="white" bordered>
        <div className={styles.papers}>
          <div>
            <SectionHeader label="What to bring" title="Keep these documents ready." />
            <dl className={styles.bring}>
              {bring.map((b) => (
                <div key={b.title} className={styles.bringRow}>
                  <dt className={styles.bringName}>{b.title}</dt>
                  <dd className={styles.bringNote}>{b.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.safety}>
            <Label>Stay safe</Label>
            <h2 className={styles.safetyTitle}>Protect yourself from fake agents.</h2>
            <ol className={styles.safetyList}>
              {safety.map((s, i) => (
                <li key={s} className={styles.safetyItem}>
                  <span className={styles.safetyNum}>{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section>
        <div className={styles.split}>
          <div className={styles.side}>
            <SectionHeader label="Questions" title="Common questions." />
          </div>
          <div className={styles.main}>
            <Faq items={jobSeekerFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        title={
          <>
            Ready to <em>apply?</em>
          </>
        }
        body="Visit our office in Tokha-9, Kathmandu, or call us. We will answer your questions and tell you honestly which jobs suit you."
      />
    </>
  );
}
