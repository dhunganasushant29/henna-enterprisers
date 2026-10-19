import { CountUp } from "@/components/ui";
import { cn } from "@/lib/cn";
import { offices, site } from "@/lib/site";
import { clients, industries } from "@/data";
import styles from "./FactsRow.module.css";

// Derived from the data so the figures always match what the site lists.
export const facts = [
  { value: site.yearsExperience, suffix: "+", label: "years in recruitment" },
  { value: offices.length, suffix: "", label: "offices in 4 countries" },
  { value: industries.length, suffix: "", label: "industries served" },
  { value: Math.floor(clients.length / 10) * 10, suffix: "+", label: "client companies abroad" },
];

/** Key figures separated by hairlines; each counts up once when scrolled into view. */
export function FactsRow({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <dl className={cn(styles.row, dark && styles.dark, className)}>
      {facts.map((f) => (
        <div key={f.label} className={styles.fact}>
          <dt className={styles.name}>{f.label}</dt>
          <dd className={styles.value}>
            <CountUp value={f.value} suffix={f.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
