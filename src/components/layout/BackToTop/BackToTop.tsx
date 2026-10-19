"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/cn";
import styles from "./BackToTop.module.css";

/**
 * Floating "back to top" button. It appears once the reader has scrolled past an invisible
 * marker covering the first screen and a half. One IntersectionObserver watches the marker,
 * so nothing runs while scrolling.
 */
export function BackToTop() {
  const marker = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = marker.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toTop = () => {
    // Smooth via CSS scroll-behavior on <html>; instant for people who prefer reduced motion.
    window.scrollTo({ top: 0 });
    // Keep keyboard users in the same place as the view: the skip link is the first stop.
    document.querySelector<HTMLElement>("body a[href='#main']")?.focus({ preventScroll: true });
  };

  return (
    <>
      <div ref={marker} aria-hidden className={styles.marker} />
      <Tooltip label="Back to top">
        <button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
          className={cn(styles.button, visible && styles.visible)}
        >
          <ArrowUp size={18} aria-hidden />
        </button>
      </Tooltip>
    </>
  );
}
