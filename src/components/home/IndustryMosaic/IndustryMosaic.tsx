import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui";
import { industries, industrySlug } from "@/data";
import { creditLine, photoCredits } from "@/data/photoCredits";
import type { ImageName } from "@/data/images";
import styles from "./IndustryMosaic.module.css";

/** The four industries shown as photos (tile shape matched to each photo); the rest appear as links underneath. */
const featured: { name: string; photo: ImageName; alt: string; tile: string }[] = [
  {
    name: "Construction",
    photo: "construction-workers",
    alt: "Construction workers in hard hats laying steel and concrete on a building site",
    tile: styles.wide,
  },
  {
    name: "Hotels & Restaurants",
    photo: "hotel-chef",
    alt: "A chef in a white jacket preparing food in a hotel restaurant kitchen",
    tile: styles.small,
  },
  {
    name: "Security",
    photo: "security-guard",
    alt: "A security guard in a high-visibility jacket on patrol on a city rooftop",
    tile: styles.tall,
  },
  {
    name: "Transport & Warehouses",
    photo: "factory-workers",
    alt: "Workers in blue uniforms packing products into boxes on a factory line",
    tile: styles.small,
  },
];

/** Home-page industries: a photo mosaic of the main industries, then the others as quick links. */
export function IndustryMosaic() {
  const others = industries.filter((ind) => !featured.some((f) => f.name === ind.name));
  return (
    <div className={styles.wrap}>
      <ul className={styles.grid}>
        {featured.map((f) => {
          const ind = industries.find((x) => x.name === f.name)!;
          const credit = photoCredits[f.photo];
          return (
            <li key={f.name} className={`${styles.tile} ${f.tile}`}>
              <Link href={`/industries/#${industrySlug(f.name)}`} className={styles.link}>
                <span className={styles.media}>
                  <Photo
                    name={f.photo}
                    alt={f.alt}
                    fill
                    sizes={f.tile === styles.small ? "(min-width: 1024px) 24rem, 100vw" : "(min-width: 1024px) 40rem, 100vw"}
                    className={styles.img}
                  />
                </span>
                <span aria-hidden className={styles.shade} />
                <span className={styles.top}>
                  <span aria-hidden className={styles.badge}>
                    <ind.icon size={17} />
                  </span>
                  <span aria-hidden className={styles.go}>
                    <ArrowUpRight size={18} />
                  </span>
                </span>
                <span className={styles.body}>
                  <span className={styles.name}>{f.name}</span>
                  <span className={styles.roles}>{ind.roles.join(" · ")}</span>
                  {credit ? <span className={styles.credit}>{creditLine(credit)}</span> : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={styles.more}>
        <p className={styles.moreTitle}>We also find workers for</p>
        <ul className={styles.chips}>
          {others.map((ind) => (
            <li key={ind.name}>
              <Link href={`/industries/#${industrySlug(ind.name)}`} className={styles.chip}>
                <ind.icon size={15} aria-hidden /> {ind.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
