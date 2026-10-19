import { JsonLd } from "@/components/ui";
import type { Faq as FaqItem } from "@/data";
import { faqLd } from "@/lib/seo";
import styles from "./Faq.module.css";

/** Native <details> accordion: accessible, works without JavaScript, emits FAQPage schema. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.summary}>
            <h3 className={styles.question}>{item.q}</h3>
            <span aria-hidden className={styles.icon} />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
      <JsonLd data={faqLd(items)} />
    </div>
  );
}
