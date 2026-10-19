import { Mail, MapPin, Phone, Plane } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import styles from "./BoardingPass.module.css";

type Surface = "dark" | "paper" | "white";

/**
 * Contact card designed as a boarding pass ("from Kathmandu to your next job"),
 * with a tear-off stub for the quick actions. It lays itself out from the space it is
 * given (container query), so it works in a hero column or a wide section.
 * `surface` is the background it sits on, so the cut-out notches match it.
 */
export function BoardingPass({ surface = "dark", className }: { surface?: Surface; className?: string }) {
  return (
    <div className={cn(styles.wrap, styles[surface], className)}>
      <section className={styles.pass} aria-label="Contact Henna Enterprises">
        <div className={styles.main}>
          <div className={styles.head}>
            <p className={styles.label}>Boarding pass</p>
            <span className={styles.licence}>Govt. Lic. {site.licence}</span>
          </div>

          <div className={styles.route}>
            <div>
              <span className={styles.code}>KTM</span>
              <span className={styles.name}>Kathmandu, Nepal</span>
            </div>
            <span aria-hidden className={styles.line}>
              <Plane size={18} className={styles.plane} />
            </span>
            <div className={styles.to}>
              <span className={styles.code}>
                <em>Abroad</em>
              </span>
              <span className={styles.name}>Your next job</span>
            </div>
          </div>

          <dl className={styles.fields}>
            <div>
              <dt>Passenger</dt>
              <dd>You</dd>
            </div>
            <div>
              <dt>Gate</dt>
              <dd>
                {site.address.street}, {site.address.city}
              </dd>
            </div>
            <div>
              <dt>Boarding</dt>
              <dd>{site.hours.label.replace(" (Nepal time)", "")}</dd>
            </div>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={site.phone.href}>{site.phone.intl}</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.stub}>
          <p className={styles.stubLabel}>Talk to us</p>
          <ul className={styles.actions}>
            <li>
              <a href={site.phone.href} className={styles.primary}>
                <Phone size={16} aria-hidden /> Call the office
              </a>
            </li>
            <li>
              <a href={site.mobile.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.action}>
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.action}>
                <MapPin size={16} aria-hidden /> Get directions
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email.info}`} className={styles.action}>
                <Mail size={16} aria-hidden /> Email us
              </a>
            </li>
          </ul>
          <span aria-hidden className={styles.barcode} />
        </div>
      </section>
    </div>
  );
}
