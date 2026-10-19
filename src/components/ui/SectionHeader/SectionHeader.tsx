import { cn } from "@/lib/cn";
import { Label } from "../Label";
import styles from "./SectionHeader.module.css";

type Props = {
  label?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  /** Content shown to the right of the heading on wide screens (e.g. a link). */
  action?: React.ReactNode;
  className?: string;
  id?: string;
};

/** Label + serif heading + optional intro, at the top of most sections. */
export function SectionHeader({ label, title, intro, align = "left", dark = false, action, className, id }: Props) {
  return (
    <div className={cn(styles.header, Boolean(action) && styles.withAction, className)}>
      <div className={cn(styles.text, align === "center" && styles.center)}>
        {label ? <Label dark={dark}>{label}</Label> : null}
        <h2 id={id} className={cn(styles.title, dark && styles.titleDark)}>
          {title}
        </h2>
        {intro ? <p className={cn(styles.intro, dark && styles.introDark)}>{intro}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
