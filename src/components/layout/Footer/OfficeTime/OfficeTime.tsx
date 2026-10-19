"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import styles from "./OfficeTime.module.css";

/** One shared ticker for every clock on the page, firing on each new minute. */
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;
let now = 0;

function tick() {
  now = Date.now();
  listeners.forEach((l) => l());
  timer = setTimeout(tick, 60_000 - (now % 60_000) + 50);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) tick();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

const formatters = new Map<string, Intl.DateTimeFormat>();
const format = (timeZone: string, time: number) => {
  if (!formatters.has(timeZone)) {
    formatters.set(timeZone, new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }));
  }
  return formatters.get(timeZone)!.format(time);
};

/**
 * Live local time for an office, shown as split-flap tiles like an airport board.
 * The static HTML shows "--:--"; the real time fills in once the page loads and
 * updates every minute. A tile flips only when its digit changes (keyed by value).
 */
export function OfficeTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => now,
    () => 0,
  );
  const value = time ? format(timeZone, time) : "--:--";
  return (
    <time
      className={cn(styles.clock, className)}
      dateTime={time ? value : undefined}
      aria-label={time ? `Local time ${value}` : "Local time"}
    >
      {value.split("").map((ch, i) =>
        ch === ":" ? (
          <span key={i} aria-hidden className={styles.colon}>
            :
          </span>
        ) : (
          <span key={`${i}-${ch}`} aria-hidden className={styles.tile}>
            {ch}
          </span>
        ),
      )}
    </time>
  );
}
