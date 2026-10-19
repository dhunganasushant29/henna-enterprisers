import { Label } from "@/components/ui";
import { OfficeList } from "../OfficeList";
import { RouteMap } from "../RouteMap";
import styles from "./WhereWeWork.module.css";

/** Dark band: where our people work, with the route map and the four offices. */
export function WhereWeWork() {
  return (
    <section className={styles.band} aria-labelledby="where-title">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.text}>
            <Label dark>Where we work</Label>
            <h2 id="where-title" className={styles.title}>
              From Kathmandu to the <em className={styles.accent}>Gulf</em> and more.
            </h2>
            <p className={styles.intro}>
              Our head office is in Nepal. This is where we find, test and train every worker. Our offices in the UAE, Saudi
              Arabia and India keep us close to the companies they work for.
            </p>
            <ul className={styles.legend}>
              <li className={styles.legendItem}>
                <span aria-hidden className={styles.lineSolid} /> Routes to our offices
              </li>
              <li className={styles.legendItem}>
                <span aria-hidden className={styles.lineDashed} /> Countries of our clients
              </li>
            </ul>
          </div>
          <div className={styles.map}>
            <RouteMap />
          </div>
        </div>
        <div className={styles.offices}>
          <OfficeList dark />
        </div>
      </div>
    </section>
  );
}
