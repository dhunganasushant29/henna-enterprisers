import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./TextLink.module.css";

/** Understated text link with an arrow, for secondary actions. */
export function TextLink({
  href,
  children,
  className,
  light,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link href={href} className={cn(styles.link, light && styles.light, className)}>
      <span className={styles.text}>{children}</span>
      <ArrowRight size={16} className={styles.arrow} aria-hidden />
    </Link>
  );
}
