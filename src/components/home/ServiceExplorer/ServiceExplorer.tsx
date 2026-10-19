"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import { Halftone } from "@/components/ui/Halftone";
import { services, type Service } from "@/data";
import { site } from "@/lib/site";
import styles from "./ServiceExplorer.module.css";

const audienceLabel: Record<Service["audience"], string> = {
  employers: "Best for employers",
  "job-seekers": "Best for job seekers",
  both: "For employers and job seekers",
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Interactive service explorer: a numbered tab list and a feature panel.
 * All panels are in the HTML (only one is visible), so every service stays crawlable.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  /** Selects a tab and, on phones, slides the chip row so the chosen chip is visible. */
  const select = (index: number) => {
    setActive(index);
    const tab = tabsRef.current[index];
    const row = tab?.parentElement;
    if (tab && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: tab.offsetLeft - row.offsetLeft - 20, behavior: "smooth" });
    }
  };

  // Arrow-key navigation, as expected for a tab list.
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: services.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + services.length) % services.length;
    select(next);
    tabsRef.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.side}>
        <div role="tablist" aria-label="Our services" aria-orientation="vertical" className={styles.tabs}>
          {services.map((s, i) => (
            <button
              key={s.slug}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={styles.tab}
            >
              <span className={styles.num}>{pad(i + 1)}</span>
              <span className={styles.title}>{s.title}</span>
              <ChevronRight aria-hidden className={styles.chevron} />
              <span className={styles.summary}>{s.short}</span>
            </button>
          ))}
        </div>
        <div className={styles.help}>
          <p className={styles.helpTitle}>Not sure which service you need?</p>
          <p className={styles.helpBody}>Tell us what you need. We will help you choose.</p>
          <a href={site.phone.href} className={styles.helpLink}>
            <Phone size={16} aria-hidden /> <span className={styles.underline}>{site.phone.intl}</span>
          </a>
        </div>
      </div>

      <div>
        {services.map((s, i) => (
          <article
            key={s.slug}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            hidden={active !== i}
            className={styles.panel}
          >
            <Halftone tone="brand" from="fromTopRight" className={styles.dots} />
            <div className={styles.inner}>
              <div>
                <p className={styles.eyebrow}>
                  Service {pad(i + 1)} of {pad(services.length)}
                </p>
                <h3 className={styles.panelTitle}>{s.title}</h3>
                <p className={styles.intro}>{s.intro}</p>
              </div>

              <div className={styles.block}>
                <p className={styles.blockTitle}>What&apos;s included</p>
                <ul className={styles.includes}>
                  {s.includes.slice(0, 4).map((item) => (
                    <li key={item} className={styles.include}>
                      <Check size={16} className={styles.check} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.block} ${styles.howBlock}`}>
                <p className={styles.blockTitle}>How it works</p>
                <ol className={styles.steps}>
                  {s.steps.map((step, n) => (
                    <li key={step.title} className={styles.stop}>
                      <span aria-hidden className={styles.stopDot}>
                        {n + 1}
                      </span>
                      <span className={styles.stopTitle}>{step.title}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.footer}>
                <span className={styles.tag}>{audienceLabel[s.audience]}</span>
                <Link href={`/services/${s.slug}/`} className={styles.readMore}>
                  Read more
                  <ArrowRight size={16} className={styles.readMoreArrow} aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
