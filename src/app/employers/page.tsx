import { Mail } from "lucide-react";
import { CtaBand, Faq, HeroTicket, PageHero, ProcessJourney } from "@/components/sections";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";
import { employerDocuments, employerFaqs, hiringSteps } from "@/data";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Hire Workers from Nepal: Employer Guide",
  description:
    "How to hire Nepali workers through a licensed agency: the steps, the papers you need, and answers to common questions.",
  path: "/employers/",
});

const promises = [
  {
    title: "Fully legal",
    body: `Licensed by the Government of Nepal (Lic. No. ${site.licence}). Every hire is approved by the Department of Foreign Employment.`,
  },
  {
    title: "Tested before you hire",
    body: "Interviews and work tests show you what each worker can do before they arrive.",
  },
  { title: "We do the paperwork", body: "Medical check, visa, labour approval and tickets. We do it all and keep you updated." },
  { title: "Clear dates", body: "We tell you the dates at the start, and we tell you early if anything changes." },
];

const brief = [
  "The job titles and number of workers",
  "Salary, contract length and working hours",
  "Food, housing and other benefits",
  "The country where they will work",
];

const requirementMail = `mailto:${site.email.corporate}?subject=Manpower%20requirement`;

export default function EmployersPage() {
  return (
    <>
      <PageHero
        image={{
          name: "employer-meeting",
          alt: "An employer and a recruiter smiling and shaking hands across an office desk",
          focus: "50% 35%",
          flip: true,
        }}
        crumbs={[{ name: "For Employers", path: "/employers/" }]}
        label="For employers"
        title={
          <>
            Hire reliable workers from Nepal, <em>the easy way.</em>
          </>
        }
        intro="Tell us what you need and we will do the rest. We find the workers, arrange interviews and tests, prepare the papers and send your new team to you."
        aside={
          <HeroTicket label="To get started" title="Send us four things.">
            <ol className={styles.brief}>
              {brief.map((item, i) => (
                <li key={item} className={styles.briefItem}>
                  <span aria-hidden className={styles.briefNum}>
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <a href={requirementMail} className={styles.briefMail}>
              <Mail size={16} aria-hidden /> Email the job details
            </a>
            <p className={styles.briefTo}>to {site.email.corporate}</p>
          </HeroTicket>
        }
      >
        <ButtonLink href={requirementMail}>Tell us what you need</ButtonLink>
        <ButtonLink href={site.phone.href} variant="outlineLight">
          Call {site.phone.intl}
        </ButtonLink>
      </PageHero>

      <Section defer={false} spacing="compact">
        <ul className={styles.promises}>
          {promises.map((p) => (
            <li key={p.title} className={styles.promise}>
              <h2 className={styles.itemTitle}>{p.title}</h2>
              <p className={styles.itemBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <ProcessJourney
          steps={hiringSteps}
          header={
            <SectionHeader
              label="Hiring steps"
              title="How hiring works, step by step."
              intro="This is the official way to hire workers from Nepal. We help you at every step."
            />
          }
        />
      </Section>

      <Section>
        <div className={styles.split}>
          <div className={styles.side}>
            <div className={styles.sticky}>
              <SectionHeader
                label="Documentation"
                title="Papers we need from you."
                intro="Nepal's law asks for these papers before workers can be approved. We give you sample forms and help you fill each one."
              />
              <ButtonLink
                href={`mailto:${site.email.corporate}?subject=Request%20for%20document%20templates`}
                variant="dark"
                className={styles.sideAction}
              >
                Ask for sample forms
              </ButtonLink>
            </div>
          </div>
          <ol className={`${styles.main} ${styles.docs}`}>
            {employerDocuments.map((d, i) => (
              <li key={d.title} className={styles.doc}>
                <span aria-hidden className={styles.docNum}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className={styles.itemTitle}>{d.title}</h3>
                  <p className={styles.itemBody}>{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="white" bordered>
        <div className={styles.split}>
          <div className={styles.side}>
            <SectionHeader label="Questions" title="Common questions." />
          </div>
          <div className={styles.main}>
            <Faq items={employerFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        title={
          <>
            Ready to build <em>your team?</em>
          </>
        }
        body="Tell us what you need today. We will reply with the next steps and the list of papers you need."
      />
    </>
  );
}
