"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import motion from "@/styles/motion.module.css";

/**
 * Play-once scroll reveal for every element using the shared `reveal` style.
 * Elements already on screen are marked shown straight away (no flash); the rest wait
 * hidden and fade up once when they scroll into view. Renders nothing.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(`.${motion.reveal}:not([data-shown])`));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "1";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.dataset.shown = "0";
      else observer.observe(el);
    }
    document.documentElement.dataset.reveal = "";
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
