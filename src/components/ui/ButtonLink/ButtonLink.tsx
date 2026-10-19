import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./ButtonLink.module.css";

export type ButtonVariant = "primary" | "dark" | "outline" | "light" | "outlineLight";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  /** Replaces the trailing arrow with a leading icon (e.g. a phone). */
  icon?: React.ReactNode;
  className?: string;
};

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

/** Pill-shaped call-to-action link. next/link for routes, <a> for phone, mail and external links. */
export function ButtonLink({ href, children, variant = "primary", icon, className }: Props) {
  const cls = cn(styles.button, styles[variant], Boolean(icon) && styles.withIcon, className);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {icon ? null : (
        <span aria-hidden className={styles.chip}>
          <ArrowRight className={styles.arrow} />
        </span>
      )}
    </>
  );

  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
