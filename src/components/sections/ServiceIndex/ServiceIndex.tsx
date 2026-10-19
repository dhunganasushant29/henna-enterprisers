import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data";
import styles from "./ServiceIndex.module.css";

/** Editorial list of services, each row linking to its own page. */
export function ServiceIndex({ excludeSlug }: { excludeSlug?: string }) {
  const items = services.filter((s) => s.slug !== excludeSlug);
  return (
    <ul className={styles.list}>
      {items.map((s) => {
        const n = services.indexOf(s) + 1;
        return (
          <li key={s.slug} className={styles.row}>
            <span aria-hidden className={styles.num}>
              0{n}
            </span>
            <h3 className={styles.title}>
              <Link href={`/services/${s.slug}/`} className={styles.stretch}>
                {s.title}
              </Link>
            </h3>
            <p className={styles.short}>{s.short}</p>
            <span aria-hidden className={styles.arrow}>
              <ArrowRight size={16} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
