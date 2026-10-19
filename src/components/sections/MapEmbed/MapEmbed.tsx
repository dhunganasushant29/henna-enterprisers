import { site } from "@/lib/site";
import styles from "./MapEmbed.module.css";

/** Google map of the head office. `loading="lazy"` means the browser only loads it when it is near the screen. */
export function MapEmbed() {
  return (
    <div className={styles.frame}>
      <iframe
        src={site.mapsEmbed}
        title="Henna Enterprises head office on Google Maps"
        className={styles.map}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
