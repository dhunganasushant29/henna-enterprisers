import { cn } from "@/lib/cn";
import styles from "./ProcessSteps.module.css";

export type ProcessStep = { title: string; body: string };

/** Numbered steps in a calm, typographic grid. */
export function ProcessSteps({ steps, dark = false, className }: { steps: ProcessStep[]; dark?: boolean; className?: string }) {
  // Four steps sit on one row; six (or three) use the default three-column grid.
  return (
    <ol className={cn(styles.list, steps.length === 4 && styles.four, dark ? styles.dark : styles.light, className)}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step}>
          <span aria-hidden className={styles.num}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.body}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
