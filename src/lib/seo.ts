import type { Metadata } from "next";
import { services } from "@/data";
import { absoluteUrl, md, offices, site } from "./site";

type PageMeta = { title: string; description: string; path: string };

/** The share image used when a page is posted on WhatsApp, Facebook, LinkedIn or X. */
export const shareImage = {
  url: absoluteUrl("/opengraph-image.png"),
  width: 1200,
  height: 630,
  alt: "Henna Enterprises: licensed manpower agency in Kathmandu, Nepal",
};

/**
 * Builds consistent per-page metadata: canonical URL, Open Graph and Twitter.
 * The share image is set on every page: a page's own openGraph replaces the layout's,
 * so leaving it out here would drop the image from inner pages.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
      siteName: site.shortName,
      locale: site.locale,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

const countryCode: Record<string, string> = {
  Nepal: "NP",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  India: "IN",
};

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/brand/emblem.png"), width: 288, height: 309 },
  image: absoluteUrl("/opengraph-image.png"),
  description: site.description,
  telephone: site.phone.intl,
  email: site.email.info,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone.intl,
      email: site.email.info,
      areaServed: "NP",
      availableLanguage: ["English", "Nepali"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      name: "Employers and recruitment requests",
      telephone: site.mobile.display.replace(/\s/g, ""),
      email: site.email.corporate,
      availableLanguage: ["English", "Nepali"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsUrl,
  areaServed: ["Nepal", "Saudi Arabia", "United Arab Emirates", "Kuwait", "India"],
  knowsLanguage: ["en", "ne"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Foreign employment licence",
    identifier: site.licence,
    recognizedBy: { "@type": "GovernmentOrganization", name: site.regulator },
  },
  employee: { "@type": "Person", name: md.name, jobTitle: "Managing Director" },
  // Head office plus the offices abroad
  location: offices.map((o) => ({
    "@type": "Place",
    name: `${site.shortName}, ${o.role}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: o.lines[0],
      addressLocality: o.city,
      addressCountry: countryCode[o.country] ?? o.country,
    },
  })),
  // What we offer, each linking to its own page
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Manpower services",
    itemListElement: services.map((sv) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: sv.title,
        description: sv.short,
        url: absoluteUrl(`/services/${sv.slug}/`),
      },
    })),
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.shortName,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};
