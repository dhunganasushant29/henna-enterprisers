import { Star } from "lucide-react";
import styles from "./Stars.module.css";

export function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <span className={styles.stars} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={size} className={styles.star} />
      ))}
    </span>
  );
}
