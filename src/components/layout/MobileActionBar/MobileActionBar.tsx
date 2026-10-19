"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Phone } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import styles from "./MobileActionBar.module.css";

const WIDE = "(min-width: 768px)";
const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Quick contact buttons. On phones, near the top of the page they are two small floating
 * buttons (call and WhatsApp) so they do not cover the hero; once the reader scrolls past
 * the first screen they turn into a full-width bar. On wider screens the floating buttons
 * simply stay. One IntersectionObserver watches an invisible marker, so nothing runs while scrolling.
 */
export function MobileActionBar() {
  const marker = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
  const showFloats = wide || !scrolled;
  const showBar = !wide && scrolled;

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

      {/* Floating buttons: always on wide screens, on phones only before the reader scrolls */}
      <div className={cn(styles.floats, !showFloats && styles.away)} aria-hidden={!showFloats}>
        <Tooltip label={`Call ${site.phone.display}`}>
          <a
            href={site.phone.href}
            className={cn(styles.fab, styles.fabCall)}
            aria-label={`Call us on ${site.phone.display}`}
            tabIndex={showFloats ? 0 : -1}
          >
            <Phone size={22} aria-hidden />
          </a>
        </Tooltip>
        <div className={styles.fabRow}>
          <span aria-hidden className={styles.pill}>
            <span className={styles.pillDot} /> WhatsApp
          </span>
          <a
            href={site.mobile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(styles.fab, styles.fabWhatsapp)}
            aria-label="Message us on WhatsApp"
            tabIndex={showFloats ? 0 : -1}
          >
            <WhatsAppIcon size={26} />
          </a>
        </div>
      </div>

      {/* Full-width bar, phones only, once the reader has scrolled */}
      <nav aria-label="Quick contact" aria-hidden={!showBar} className={cn(styles.bar, showBar && styles.shown)}>
        <a href={site.phone.href} className={cn(styles.action, styles.call)} tabIndex={showBar ? 0 : -1}>
          <Phone size={16} aria-hidden /> Call us
        </a>
        <a
          href={site.mobile.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(styles.action, styles.whatsapp)}
          tabIndex={showBar ? 0 : -1}
        >
          <WhatsAppIcon size={16} className={styles.whatsappIcon} /> WhatsApp
        </a>
      </nav>
    </>
  );
}
