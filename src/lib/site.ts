/**
 * Single source of truth for business facts. Everything here comes from the
 * company profile (Oct 2025) and the Google Business listing, so keep it in
 * sync with those when details change.
 */
/**
 * Where the site is published. Both come from the environment at build time:
 * - NEXT_PUBLIC_BASE_PATH: sub-folder the site lives in ("/henna-enterprisers" on GitHub Pages,
 *   empty when it has its own domain).
 * - NEXT_PUBLIC_SITE_URL: the full public address, used for canonical URLs, share images,
 *   the sitemap and schema. Without it, the company domain is used.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hennaconsultants.com").replace(/\/$/, "");

/** A file in /public, with the sub-folder in front ("/brand/logo.png" -> "/henna-enterprisers/brand/logo.png"). */
export const asset = (path: string) => `${basePath}${path}`;
/** Full public URL for a page or file ("/about/" -> "https://…/about/"). */
export const absoluteUrl = (path = "/") => `${siteUrl}${path}`;

export const site = {
  name: "Henna Enterprises Manpower Consultants Pvt. Ltd.",
  shortName: "Henna Enterprises",
  url: siteUrl,
  locale: "en_NP",
  description:
    "Licensed manpower agency in Kathmandu, Nepal. For 30+ years we have placed skilled Nepali workers with trusted companies in Saudi Arabia, the UAE and Kuwait.",
  licence: "1787/082/083",
  registration: "367958/81/82",
  regulator: "Ministry of Labour, Government of Nepal",
  yearsExperience: 30,
  googleRating: { value: "5.0", count: 4 },
  phone: { display: "01-4979649", intl: "+977-1-4979649", href: "tel:+97714979649" },
  mobile: { display: "+977 985-6045586", href: "tel:+9779856045586", whatsapp: "https://wa.me/9779856045586" },
  email: { info: "info@hennaconsultants.com", corporate: "corporate@hennaconsultants.com" },
  hours: { opens: "10:00", label: "Opens 10:00 AM (Nepal time)" },
  address: {
    street: "Tokha-9, near Shiva Mandir",
    locality: "Tokha",
    city: "Kathmandu",
    region: "Bagmati Province",
    postalCode: "44600",
    country: "NP",
    countryName: "Nepal",
    plusCode: "P8P6+9RP",
  },
  geo: { lat: 27.7359678, lng: 85.31208 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Henna+Enterprises+Manpower+Consultants+Pvt.+Ltd.+Tokha",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4138.353226568677!2d85.31208!3d27.7359678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190005a0608f%3A0xc667549af25d3221!2sHenna%20Enterprises%20Manpower%20Consultants%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1791995732525!5m2!1sen!2snp",
} as const;

export const nav = [
  { href: "/about/", label: "About" },
  { href: "/services/", label: "Services" },
  { href: "/industries/", label: "Industries" },
  { href: "/employers/", label: "Employers" },
  { href: "/job-seekers/", label: "Job Seekers" },
] as const;

export type Office = {
  city: string;
  country: string;
  role: string;
  lines: string[];
  /** Nearest airport code, shown on the footer's departures board. */
  code: string;
  /** IANA time zone, for the live local time in the footer. */
  timeZone: string;
  /** Hours ahead of UTC (none of these places use daylight saving). */
  utcOffset: number;
  phone?: { display: string; href: string };
};

export const offices: Office[] = [
  {
    city: "Kathmandu",
    country: "Nepal",
    code: "KTM",
    timeZone: "Asia/Kathmandu",
    utcOffset: 5.75,
    role: "Head office",
    lines: ["Tokha-9, near Shiva Mandir", "Kathmandu 44600, Nepal"],
    phone: { display: "+977-1-4979649", href: "tel:+97714979649" },
  },
  {
    city: "Sharjah",
    code: "SHJ",
    timeZone: "Asia/Dubai",
    utcOffset: 4,
    country: "United Arab Emirates",
    role: "UAE office",
    lines: ["M2-115, Al Nasserya", "Zohra Street, Sharjah, UAE"],
  },
  {
    city: "Al Jubail",
    code: "QJB",
    timeZone: "Asia/Riyadh",
    utcOffset: 3,
    country: "Saudi Arabia",
    role: "Saudi office",
    lines: ["3536, King Fahad Industrial Area", "Al Jubail 35711, Saudi Arabia"],
  },
  {
    city: "Mumbai",
    code: "BOM",
    timeZone: "Asia/Kolkata",
    utcOffset: 5.5,
    country: "India",
    role: "India office",
    lines: ["Cassinath Bldg, V.S. Road", "Cadel Road, Mahim, Mumbai 400016"],
  },
];

export const md = {
  name: "Dinesh Bhandari",
  title: "Managing Director",
  email: "corporate@hennaconsultants.com",
  phone: "+977 985-6045586",
};
