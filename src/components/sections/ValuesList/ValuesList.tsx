import { values } from "@/data";
import styles from "./ValuesList.module.css";

/** The four principles, as a numbered list with hairlines. */
export function ValuesList() {
  return (
    <ol className={styles.list}>
      {values.map((v, i) => (
        <li key={v.title} className={styles.item}>
          <span className={styles.number}>0{i + 1}</span>
          <h3 className={styles.title}>{v.title}</h3>
          <p className={styles.body}>{v.body}</p>
        </li>
      ))}
    </ol>
  );
}
