import { industries } from "@/data";
import { cn } from "@/lib/cn";
import styles from "./IndustryIndex.module.css";

/** Industries and typical roles as a clean one- or two-column index. */
export function IndustryIndex({ limit, columns = 2 }: { limit?: number; columns?: 1 | 2 }) {
  const items = limit ? industries.slice(0, limit) : industries;
  return (
    <dl className={cn(styles.list, columns === 2 && styles.twoColumns)}>
      {items.map((ind) => (
        <div key={ind.name} className={styles.row}>
          <dt className={styles.name}>{ind.name}</dt>
          <dd className={styles.roles}>{ind.roles.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
