import { absoluteUrl, offices, site } from "@/lib/site";

export const dynamic = "force-static";

const pages: [string, string, string][] = [
  ["Home", "/", "overview, services, hiring steps, clients, offices"],
  ["For employers", "/employers/", "how to hire workers from Nepal, documents needed, FAQs"],
  ["For job seekers", "/job-seekers/", "how to apply for a job abroad, papers to bring, how to avoid fake agents, FAQs"],
  ["Services", "/services/", "recruitment, skill tests, visa and travel, hotel internships, training before travel"],
  ["Industries", "/industries/", "industries and job roles we recruit for"],
  ["About", "/about/", "company story, mission, values, Managing Director"],
  ["Contact", "/contact/", "phone, WhatsApp, email, map and all office addresses"],
];

/** /llms.txt: a short plain-text summary of the company and its pages for AI search tools. */
export function GET() {
  const abroad = offices
    .slice(1)
    .map((o) => `${o.city} (${o.country})`)
    .join(", ");
  const body = `# ${site.name}

> Government-licensed manpower (foreign employment) agency in Kathmandu, Nepal. For more than ${site.yearsExperience} years it has recruited skilled, semi-skilled and general Nepali workers for companies in Saudi Arabia, the United Arab Emirates, Kuwait and other countries, and handled their skill tests, medical checks, visas, labour approval, travel and pre-departure training.

- Licence: ${site.licence} (${site.regulator})
- Company registration: ${site.registration}
- Head office: ${site.address.street}, ${site.address.city} ${site.address.postalCode}, Nepal. Phone ${site.phone.intl}. Email ${site.email.info}
- Employers: ${site.email.corporate}
- Other offices: ${abroad}

## Pages

${pages.map(([name, path, about]) => `- [${name}](${absoluteUrl(path)}): ${about}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
