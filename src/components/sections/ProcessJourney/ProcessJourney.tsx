import type { Step, StepOwner } from "@/data";
import { cn } from "@/lib/cn";
import styles from "./ProcessJourney.module.css";

const ownerLabel: Record<StepOwner, string> = {
  you: "You",
  henna: "Henna does it",
  together: "Together",
};

const pad = (n: number) => String(n).padStart(2, "0");

function OwnerPill({ owner }: { owner: StepOwner }) {
  return <span className={cn(styles.owner, styles[owner])}>{ownerLabel[owner]}</span>;
}

/**
 * Vertical journey: sticky heading on the left, steps on a timeline on the right.
 * The red rail fills and each node lights up as you scroll (CSS scroll-driven, no JS).
 */
export function ProcessJourney({
  steps,
  header,
  aside,
  showKey = true,
}: {
  steps: Step[];
  /** Heading block shown in the sticky left column. */
  header: React.ReactNode;
  /** Extra content under the heading (e.g. a link). */
  aside?: React.ReactNode;
  /** Show the "who does what" key. Only meaningful when steps have owners. */
  showKey?: boolean;
}) {
  const hasOwners = showKey && steps.some((s) => s.owner);
  return (
    <div className={styles.layout}>
      <div className={styles.aside}>
        {header}
        {hasOwners ? (
          <div className={styles.key}>
            <p className={styles.keyTitle}>Who does what</p>
            <p className={styles.keyRow}>
              <OwnerPill owner="you" /> Your part as the employer
            </p>
            <p className={styles.keyRow}>
              <OwnerPill owner="henna" /> We take care of it
            </p>
            <p className={styles.keyRow}>
              <OwnerPill owner="together" /> We do it with you
            </p>
          </div>
        ) : null}
        {aside ? <div className={styles.extra}>{aside}</div> : null}
      </div>

      <ol className={styles.track}>
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span aria-hidden className={styles.node}>
              <step.icon />
            </span>
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.cardHead}>
                  <span className={styles.stepNo}>
                    Step {pad(i + 1)} <span className={styles.stepTotal}>/ {pad(steps.length)}</span>
                  </span>
                  {step.owner ? <OwnerPill owner={step.owner} /> : null}
                </div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.body}>{step.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
