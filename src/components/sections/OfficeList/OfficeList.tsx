import { cn } from "@/lib/cn";
import { offices } from "@/lib/site";
import styles from "./OfficeList.module.css";

/** Four offices in a hairline-separated row. */
export function OfficeList({ dark = false }: { dark?: boolean }) {
  return (
    <ul className={cn(styles.list, dark && styles.dark)}>
      {offices.map((o) => (
        <li key={o.city} className={styles.office}>
          <p className={styles.role}>{o.role}</p>
          <h3 className={styles.city}>{o.city}</h3>
          <p className={styles.country}>{o.country}</p>
          <address className={styles.address}>
            {o.lines.map((l) => (
              <span key={l} className={styles.line}>
                {l}
              </span>
            ))}
          </address>
          {o.phone ? (
            <a href={o.phone.href} className={styles.phone}>
              {o.phone.display}
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
