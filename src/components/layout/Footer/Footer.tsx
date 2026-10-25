import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Phone, Plane, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import { services } from "@/data";
import { asset, nav, offices, site } from "@/lib/site";
import { OfficeTime } from "./OfficeTime";
import styles from "./Footer.module.css";

const companyLinks = [{ href: "/", label: "Home" }, ...nav, { href: "/contact/", label: "Contact" }];
const serviceLinks = services.map((s) => ({ href: `/services/${s.slug}/`, label: s.title }));

const head = offices[0];

/** "1h 45m behind", worked out from the fixed UTC offsets (none of these places use daylight saving). */
function offsetFromHead(utcOffset: number) {
  const diff = Math.round((utcOffset - head.utcOffset) * 60);
  if (diff === 0) return "Nepal time";
  const h = Math.floor(Math.abs(diff) / 60);
  const m = Math.abs(diff) % 60;
  return `${[h ? `${h}h` : "", m ? `${m}m` : ""].filter(Boolean).join(" ")} ${diff < 0 ? "behind" : "ahead"}`;
}

/**
 * Site footer: brand and large contact lines on top, then the offices on a departures
 * board with live local times on split-flap tiles, and the links.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div aria-hidden className={styles.glow} />

      <div className={styles.inner}>
        {/* ---- Brand + contact lines ---- */}
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label="Henna Enterprises home">
              <Image unoptimized src={asset("/brand/emblem-dark.webp")} alt="" width={89} height={96} className={styles.emblem} />
              <Image
                unoptimized
                src={asset("/brand/word-dark.webp")}
                alt="Henna Enterprises"
                width={216}
                height={72}
                className={styles.wordmark}
              />
            </Link>
            <p className={styles.tagline}>
              Your journey to a good job abroad <em>starts in Tokha.</em>
            </p>
            <p className={styles.about}>
              A licensed manpower agency in Kathmandu. For over {site.yearsExperience} years, we have helped Nepali workers find
              good jobs abroad, and helped companies find workers they can trust.
            </p>
            <ul className={styles.badges} aria-label="Licence and rating">
              <li className={styles.badge}>
                <BadgeCheck size={15} className={styles.iconGreen} aria-hidden />
                Reg. no. <strong>{site.registration}</strong>
              </li>
              <li className={styles.badge}>
                <Star size={15} className={styles.iconGold} aria-hidden />
                <strong>{site.googleRating.value}</strong> on Google
              </li>
            </ul>
          </div>

          <ul className={styles.lines} aria-label="Contact us">
            <li>
              <a href={site.phone.href} className={styles.line}>
                <span className={styles.lineLabel}>Call the office</span>
                <span className={styles.lineValue}>{site.phone.display}</span>
                <span aria-hidden className={styles.lineArrow}>
                  <Phone size={18} />
                </span>
              </a>
            </li>
            <li>
              <a href={site.mobile.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.line}>
                <span className={styles.lineLabel}>Message us on WhatsApp</span>
                <span className={styles.lineValue}>{site.mobile.display}</span>
                <span aria-hidden className={styles.lineArrow}>
                  <WhatsAppIcon size={18} />
                </span>
              </a>
            </li>
            <li>
              <a href={site.mobile2.href} className={styles.line}>
                <span className={styles.lineLabel}>Call our mobile</span>
                <span className={styles.lineValue}>{site.mobile2.display}</span>
                <span aria-hidden className={styles.lineArrow}>
                  <Phone size={18} />
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email.info}`} className={styles.line}>
                <span className={styles.lineLabel}>Write to us</span>
                <span className={styles.lineValue}>{site.email.info}</span>
                <span aria-hidden className={styles.lineArrow}>
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* ---- Departures board ---- */}
        <section className={styles.board} aria-labelledby="footer-offices">
          <div className={styles.boardHead}>
            <h2 id="footer-offices" className={styles.boardTitle}>
              <Plane size={16} aria-hidden className={styles.boardPlane} /> Our offices
            </h2>
            <span className={styles.live}>
              <span aria-hidden className={styles.liveDot} /> Live local time
            </span>
          </div>
          <div className={styles.boardCols} aria-hidden>
            <span>Code</span>
            <span>Office</span>
            <span className={styles.colTime}>Local time</span>
            <span className={styles.colDiff}>From Kathmandu</span>
          </div>
          <ul className={styles.rows}>
            {offices.map((o) => (
              <li key={o.city} className={styles.row}>
                <span className={styles.code}>{o.code}</span>
                <span className={styles.place}>
                  <span className={styles.city}>{o.city}</span>
                  <span className={styles.country}>
                    {o.role} · {o.country}
                  </span>
                </span>
                <OfficeTime timeZone={o.timeZone} className={styles.clock} />
                <span className={o === head ? styles.diffHead : styles.diff}>{offsetFromHead(o.utcOffset)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Links ---- */}
        <nav aria-label="Footer" className={styles.columns}>
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <div>
            <h2 className={styles.heading}>Write to us</h2>
            <ul className={styles.list}>
              <li>
                <span className={styles.listNote}>Job seekers & questions</span>
                <a href={`mailto:${site.email.info}`} className={styles.link}>
                  {site.email.info}
                </a>
              </li>
              <li>
                <span className={styles.listNote}>Employers</span>
                <a href={`mailto:${site.email.corporate}`} className={styles.link}>
                  {site.email.corporate}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name} All rights reserved.
          </p>
          <p className={styles.muted}>Recognised by the {site.regulator}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={styles.link}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
