"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/Sheet";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/lib/site";
import { isActivePath, mobileNav, serviceLinks } from "./nav";
import styles from "./MobileMenu.module.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
  /** Where focus goes back to when the menu closes (the menu button). */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
};

/** Menu for small screens: a dark sheet sliding in from the right. Code-split: loaded on first open. */
export function MobileMenu({ open, onOpenChange, pathname, returnFocusTo }: Props) {
  // Picking a page closes the menu at once (no slide-out), so it never overlaps the page transition.
  const [instant, setInstant] = useState(false);
  // Each time the menu opens again, closing goes back to the normal slide-out.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setInstant(false);
  }
  const go = () => {
    setInstant(true);
    onOpenChange(false);
  };

  const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={styles.sheet}
        closeLabel="Close menu"
        instantClose={instant}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <SheetTitle className={styles.title}>Menu</SheetTitle>
        <SheetDescription className={styles.srOnly}>Pages on the Henna Enterprises website</SheetDescription>

        <nav aria-label="Mobile" className={styles.nav}>
          <ul className={styles.list}>
            {mobileNav.map((item, i) => (
              <li key={item.href} className={styles.item} style={stagger(i)}>
                <Link
                  href={item.href}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  className={styles.link}
                  onClick={go}
                >
                  <span className={styles.num}>0{i + 1}</span>
                  {item.label}
                </Link>
                {item.href === "/services/" ? (
                  <ul className={styles.subList}>
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className={styles.subLink}
                          aria-current={pathname === s.href ? "page" : undefined}
                          onClick={go}
                        >
                          {s.label}
                          <ArrowUpRight size={14} aria-hidden className={styles.subArrow} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer} style={stagger(mobileNav.length)}>
          <div className={styles.actions}>
            <a href={site.phone.href} className={styles.call}>
              <Phone size={16} aria-hidden /> Call us
            </a>
            <a href={site.mobile.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </div>
          <p className={styles.licence}>Licensed by the Government of Nepal · Lic. No. {site.licence}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
