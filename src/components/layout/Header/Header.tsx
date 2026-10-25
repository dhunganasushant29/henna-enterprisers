"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/site";
import { Logo } from "../Logo";
import { isActivePath, serviceLinks } from "./nav";
import styles from "./Header.module.css";

// The mobile menu is only downloaded the first time someone opens it.
const MobileMenu = dynamic(() => import("./MobileMenu").then((m) => m.MobileMenu), { ssr: false });

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // After a service is picked from the dropdown, keep it shut until the pointer leaves "Services".
  const [panelShut, setPanelShut] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // New page: a clicked dropdown link keeps focus across client-side navigation, and the
  // dropdown opens on :focus-within, so release that focus or it stays open over the new page.
  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && navRef.current?.contains(active)) active.blur();
  }, [pathname]);
  // The menu remembers which page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  // Load the menu's code on first open, then keep it mounted so it can animate closed.
  const [menuLoaded, setMenuLoaded] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const marker = useRef<HTMLDivElement>(null);

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (next) setMenuLoaded(true);
      setOpenOn(next ? pathname : null);
    },
    [pathname],
  );

  // Shadow under the bar once the page has scrolled a little. An observer on a small
  // marker at the top of the page, so nothing runs on every scroll frame.
  useEffect(() => {
    const el = marker.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={marker} aria-hidden className={styles.marker} />
      <header className={styles.header}>
        <div className={styles.utility}>
          <div className={styles.utilityInner}>
            <p>
              Licensed by the Government of Nepal <span className={styles.sep}>|</span> Lic. No. {site.licence}
            </p>
            <div className={styles.utilityLinks}>
              <a href={`mailto:${site.email.info}`} className={styles.utilityLink}>
                <Mail size={14} aria-hidden /> {site.email.info}
              </a>
              <a href={site.phone.href} className={styles.utilityLink}>
                <Phone size={14} aria-hidden /> {site.phone.intl}
              </a>
            </div>
          </div>
        </div>

        <div className={cn(styles.bar, scrolled && styles.scrolled)}>
          <div className={styles.barInner}>
            <Logo priority />

            <nav ref={navRef} aria-label="Main" className={styles.nav}>
              <ul className={styles.navList}>
                {nav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  if (item.href !== "/services/") {
                    return (
                      <li key={item.href}>
                        <Link href={item.href} aria-current={active ? "page" : undefined} className={styles.link}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={item.href}
                      className={cn(styles.item, panelShut && styles.shut)}
                      onMouseLeave={() => setPanelShut(false)}
                    >
                      <Link href={item.href} aria-current={active ? "page" : undefined} className={styles.link}>
                        {item.label}
                        <ChevronDown className={styles.chevron} aria-hidden />
                      </Link>
                      <div className={styles.panel}>
                        <ul>
                          {serviceLinks.map((s, i) => (
                            <li key={s.href}>
                              <Link href={s.href} className={styles.panelLink} onClick={() => setPanelShut(true)}>
                                <span className={styles.panelNum}>0{i + 1}</span>
                                <span className={styles.panelTitle}>{s.label}</span>
                                <span className={styles.panelText}>{s.short}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={styles.actions}>
              <Link href="/contact/" className={styles.contact}>
                Contact us
              </Link>
              <button
                ref={menuButton}
                type="button"
                onClick={() => onOpenChange(!open)}
                aria-expanded={open}
                aria-haspopup="dialog"
                aria-label="Open menu"
                className={styles.menuButton}
              >
                <Menu size={20} aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {menuLoaded ? (
          <MobileMenu open={open} onOpenChange={onOpenChange} pathname={pathname} returnFocusTo={menuButton} />
        ) : null}
      </header>
    </>
  );
}
