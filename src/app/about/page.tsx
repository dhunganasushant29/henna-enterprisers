import {
  CtaBand,
  FactsRow,
  LicenceNote,
  MdPortrait,
  PageHero,
  PhotoCollage,
  ValuesList,
  WhereWeWork,
} from "@/components/sections";
import { ButtonLink, Label, Photo, Section, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { md, site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "About Us: 30+ Years in Recruitment",
  description:
    "Henna Enterprises is a government-licensed manpower agency in Kathmandu, with offices in Saudi Arabia, the UAE and India. Learn our story and meet our team.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about/" }]}
        label="About Henna Enterprises"
        title={
          <>
            We help workers find good jobs, <em>honestly.</em>
          </>
        }
        intro={`For more than ${site.yearsExperience} years, we have helped Nepali workers find good jobs abroad, and helped companies find workers they can trust. We are licensed by the Government of Nepal.`}
        aside={<PhotoCollage />}
      />

      <Section defer={false}>
        <div className={styles.story}>
          <div className={styles.storyHead}>
            <Label>Our story</Label>
            <h2 className={styles.h2}>Trusted for over 30 years.</h2>
          </div>
          <div className={styles.storyBody}>
            <div className={styles.prose}>
              <p>
                Henna Enterprises has been finding workers for over 30 years. We started in Nepal. As we got more clients, we
                opened offices in Saudi Arabia, the UAE and India.
              </p>
              <p>
                We work with big and small companies in many industries. We have contacts all over Nepal, so we can find good
                workers from every part of the country, not only from the big cities.
              </p>
              <p>
                We also help with skill tests, visas and air tickets. In short, we take care of everything, from finding the
                workers to their arrival.
              </p>
            </div>
            <FactsRow className={styles.facts} />
          </div>
        </div>
      </Section>

      <Section tone="white" bordered spacing="compact">
        <div className={styles.gallery}>
          <figure className={styles.office}>
            <Photo
              name="henna-office-kathmandu"
              alt={`${md.name}, Managing Director, working at his desk in the Henna Enterprises head office in Tokha, Kathmandu`}
              fill
              sizes="(min-width: 1024px) 44rem, 100vw"
              className={styles.galleryImg}
            />
            <figcaption className={styles.galleryCaption}>
              <span className={styles.galleryLabel}>Inside our office</span>
              Our head office in Tokha-9, Kathmandu, where every hire is planned and checked.
            </figcaption>
          </figure>
          <figure className={styles.valley}>
            <Photo
              name="kathmandu-valley"
              alt="Kathmandu valley under the hills on a misty morning"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className={styles.galleryImg}
            />
            <figcaption className={styles.galleryCaption}>
              <span className={styles.galleryLabel}>Based in Kathmandu</span>
              Finding good workers from every part of Nepal for {site.yearsExperience}+ years.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="white" bordered>
        <div className={styles.aims}>
          <div className={styles.aim}>
            <Label>Our mission</Label>
            <p className={styles.aimText}>To help companies find good workers, and help them grow.</p>
          </div>
          <div className={styles.aim}>
            <Label>Our vision</Label>
            <p className={styles.aimText}>Helping companies succeed with the right people.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className={styles.why}>
          <div className={styles.whyHead}>
            <SectionHeader
              label="Why choose us"
              title="How we work."
              intro="We know all of Nepal, and we know the jobs and companies abroad. That helps us find the right person for each job."
            />
          </div>
          <div className={styles.whyBody}>
            <ValuesList />
          </div>
        </div>
        <div className={styles.licence}>
          <LicenceNote />
        </div>
      </Section>

      <Section tone="white" bordered>
        <div className={styles.message}>
          <div className={styles.messagePhoto}>
            <MdPortrait />
            <p className={styles.signature}>{md.name}</p>
          </div>
          <div className={styles.messageBody}>
            <Label>Message from our Managing Director</Label>
            <h2 className={styles.h2}>Honest and fair recruitment, always.</h2>
            <div className={`${styles.prose} ${styles.messageProse}`}>
              <p>
                I have worked in recruitment for more than 10 years. Before that, I worked in hotels in the Middle East and other
                countries. Because of this, I understand both workers and companies, and I can find the person who really fits
                each company.
              </p>
              <p>
                At Henna Enterprises, we believe in honest and fair recruitment. Our goal is to connect skilled workers with good
                companies, so that both can grow and trust each other for a long time.
              </p>
              <p>I will keep working hard to give the best service to every client and every worker.</p>
            </div>
            <div className={styles.actions}>
              <ButtonLink href={`mailto:${md.email}`} variant="dark">
                Write to the Managing Director
              </ButtonLink>
              <ButtonLink href={site.mobile.href} variant="outline">
                {md.phone}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <WhereWeWork />
      <CtaBand />
    </>
  );
}
