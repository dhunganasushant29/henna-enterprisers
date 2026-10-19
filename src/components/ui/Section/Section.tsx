import { cn } from "@/lib/cn";
import styles from "./Section.module.css";

type Tone = "paper" | "white" | "sand" | "ink";
type Spacing = "default" | "compact" | "flush" | "none";

/**
 * Standard page section: consistent rhythm, background tone and container.
 * `defer` skips rendering work until the section is near the viewport (content-visibility).
 * `spacing="flush"` is for a section that continues straight on from the one above it.
 */
export function Section({
  tone = "paper",
  spacing = "default",
  defer = true,
  bordered = false,
  id,
  labelledBy,
  className,
  innerClassName,
  children,
}: {
  tone?: Tone;
  spacing?: Spacing;
  defer?: boolean;
  /** Hairline above the section, for separating two sections of the same tone. */
  bordered?: boolean;
  id?: string;
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(styles.section, styles[tone], bordered && styles.bordered, defer && styles.deferred, className)}
    >
      <div className={cn(styles.inner, styles[spacing], innerClassName)}>{children}</div>
    </section>
  );
}
