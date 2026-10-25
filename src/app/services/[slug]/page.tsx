import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Users } from "lucide-react";
import { CtaBand, HeroCard, PageHero, PhotoFeature, ProcessSteps, ServiceIndex } from "@/components/sections";
import { ButtonLink, JsonLd, Label, Section, SectionHeader } from "@/components/ui";
import { getService, services } from "@/data";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${slug}/` });
}

const audienceLabel = {
  employers: "Best for employers",
  "job-seekers": "Best for job seekers",
  both: "For employers and job seekers",
} as const;

const audienceCta = {
  employers: { href: "/employers/", label: "Guide for employers" },
  "job-seekers": { href: "/job-seekers/", label: "Guide for job seekers" },
  both: { href: "/employers/", label: "Guide for employers" },
} as const;

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.indexOf(service) + 1;
  const path = `/services/${slug}/`;
  const secondary = audienceCta[service.audience];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: service.title, path },
        ]}
        label={`Service 0${index} of 0${services.length}`}
        title={service.title}
        intro={service.intro}
        aside={
          <HeroCard label="At a glance" title={service.short}>
            <ol className={styles.glance}>
              {service.steps.map((step, i) => (
                <li key={step.title} className={styles.glanceStep}>
                  <span aria-hidden className={styles.glanceNum}>
                    {i + 1}
                  </span>
                  {step.title}
                </li>
              ))}
            </ol>
            <p className={styles.glanceFor}>
              <Users size={15} aria-hidden /> {audienceLabel[service.audience]}
            </p>
          </HeroCard>
        }
      >
        <ButtonLink href="/contact/">Ask about this service</ButtonLink>
        <ButtonLink href={secondary.href} variant="outline">
          {secondary.label}
        </ButtonLink>
      </PageHero>

      <Section defer={false}>
        <PhotoFeature
          name={service.photo.name}
          alt={service.photo.alt}
          focus={service.photo.focus}
          label={service.title}
          title={service.short}
          priority
          className={styles.photo}
        />
        <div className={styles.overview}>
          <div className={styles.overviewText}>
            <Label>Overview</Label>
            <div className={styles.prose}>
              {service.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className={styles.overviewAside}>
            <div className={styles.includes}>
              <h2 className={styles.includesTitle}>What is included</h2>
              <ul className={styles.includesList}>
                {service.includes.map((item) => (
                  <li key={item} className={styles.include}>
                    <Check size={16} className={styles.check} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="white" bordered>
        <SectionHeader label="How it works" title={`${service.title}, step by step.`} />
        <ProcessSteps steps={service.steps} className={styles.steps} />
      </Section>

      <Section>
        <SectionHeader label="More services" title="Other ways we can help." />
        <div className={styles.more}>
          <ServiceIndex excludeSlug={slug} />
        </div>
      </Section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.intro,
          serviceType: service.title,
          url: absoluteUrl(path),
          image: absoluteUrl(`${images[service.photo.name].src}-1600.webp`),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: ["Nepal", "Saudi Arabia", "United Arab Emirates", "Kuwait"],
        }}
      />
    </>
  );
}
