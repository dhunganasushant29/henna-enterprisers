import { cn } from "@/lib/cn";
import styles from "./Halftone.module.css";

type Corner = "fromTopRight" | "fromBottomRight" | "fromTopLeft" | "fromBottomLeft";

/** Decorative halftone dots. Position and size it with `className` (it is absolutely positioned). */
export function Halftone({
  tone = "brand",
  from = "fromTopRight",
  className,
}: {
  tone?: "brand" | "ink" | "light";
  from?: Corner;
  className?: string;
}) {
  return <div aria-hidden className={cn(styles.halftone, styles[tone], styles[from], className)} />;
}
