"use client";

import dynamic from "next/dynamic";
import styles from "./Globe.module.css";

const LABEL =
  "Globe showing routes from our Kathmandu head office to our offices in Sharjah, Al Jubail and Mumbai, and to clients in Kuwait and Makkah";

/** Placeholder with the same size as the globe, so nothing shifts while it loads. */
function Poster() {
  return (
    <div className={styles.wrap} role="img" aria-label={LABEL}>
      <div aria-hidden className={styles.poster} />
    </div>
  );
}

// The globe script is split out and loaded after the page is interactive.
const Globe = dynamic(() => import("./Globe").then((m) => m.Globe), { ssr: false, loading: Poster });

export function GlobeLazy() {
  return <Globe label={LABEL} />;
}
