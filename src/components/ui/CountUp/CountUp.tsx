"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * A number that counts up once when it scrolls into view.
 * The server renders the final value, so search engines and visitors without
 * JavaScript always see the real figure. Reduced motion shows it immediately.
 */
export function CountUp({ value, suffix = "", duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    // Reset to zero before the browser paints, then count up when visible.
    el.textContent = "0";
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = String(Math.round(easeOut(t) * value));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
      {suffix}
    </>
  );
}
