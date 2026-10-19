import { cn } from "@/lib/cn";
import styles from "./Label.module.css";

/** Small uppercase label above a heading. */
export function Label({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return <p className={cn(styles.label, dark && styles.dark, className)}>{children}</p>;
}
