import { MapPin } from "lucide-react";
import { BoardingPass, ContactForm, CtaBand, MapEmbed, OfficeList, PageHero } from "@/components/sections";
import { ButtonLink, Label, Section, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { md, site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Contact Us: Office in Tokha, Kathmandu",
  description:
    "Call 01-4979649 or visit Henna Enterprises at Tokha-9, near Shiva Mandir, Kathmandu. We also have offices in Sharjah (UAE), Al Jubail (Saudi Arabia) and Mumbai.",
  path: "/contact/",
});

const channels = [
  { k: "Office phone", v: site.phone.intl, href: site.phone.href, note: "Best for quick questions" },
  { k: "Mobile and WhatsApp", v: site.mobile.display, href: site.mobile.whatsapp, note: "Call or send a WhatsApp message" },
  { k: "Mobile", v: site.mobile2.display, href: site.mobile2.href, note: "Our second mobile number" },
  {
    k: "General questions",
    v: site.email.info,
    href: `mailto:${site.email.info}`,
    note: "For job seekers and all other questions",
  },
  { k: "Employers", v: site.email.corporate, href: `mailto:${site.email.corporate}`, note: "To hire workers" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        label="Contact us"
        title={
          <>
            Come and see us, or <em>just call.</em>
          </>
        }
        intro="Our head office is in Tokha, Kathmandu. You can visit us, call us or send us an email. Our team will reach you soon."
        aside={<BoardingPass surface="paper" />}
      />

      <Section defer={false}>
        <div className={styles.layout}>
          <div className={styles.formCol}>
            <ContactForm />
          </div>
          <div className={styles.infoCol}>
            <Label>Head office</Label>
            <address className={styles.address}>
              {site.address.street}
              <br />
              {site.address.city} {site.address.postalCode}, Nepal
            </address>
            <p className={styles.openHours}>{site.hours.label}</p>
            <ButtonLink
              href={site.mapsUrl}
              variant="outline"
              icon={<MapPin size={16} aria-hidden />}
              className={styles.directions}
            >
              Get directions
            </ButtonLink>

            <dl className={styles.channels}>
              {channels.map((c) => (
                <div key={c.k} className={styles.channel}>
                  <dt className={styles.channelName}>{c.k}</dt>
                  <dd className={styles.channelValue}>
                    <a
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={styles.channelLink}
                    >
                      {c.v}
                    </a>
                  </dd>
                  <dd className={styles.channelNote}>{c.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="white" bordered>
        <SectionHeader label="Find us" title="Visit us in Nepal, the Gulf or India." />
        <div className={styles.map}>
          <MapEmbed />
        </div>
        <div className={styles.offices}>
          <OfficeList />
        </div>
        <p className={styles.employerTip}>
          <strong className={styles.strong}>Employers:</strong> to save time, please write the job titles, number of workers,
          salary, contract length and country in your first email to {md.name}, our Managing Director, at{" "}
          <a href={`mailto:${site.email.corporate}`} className={styles.tipLink}>
            {site.email.corporate}
          </a>
          .
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
