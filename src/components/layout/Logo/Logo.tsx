import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site";
import styles from "./Logo.module.css";

export function Logo({ priority = false, className }: { priority?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Henna Enterprises home" className={cn(styles.logo, className)}>
      <Image
        unoptimized
        src={asset("/brand/emblem-sm.webp")}
        alt=""
        width={82}
        height={88}
        priority={priority}
        className={styles.emblem}
      />
      <Image
        unoptimized
        src={asset("/brand/word-sm.webp")}
        alt="Henna Enterprises"
        width={216}
        height={72}
        priority={priority}
        className={styles.wordmark}
      />
      <span aria-hidden className={styles.divider} />
      <span className={styles.tagline}>
        Manpower
        <br />
        Consultants
      </span>
    </Link>
  );
}
