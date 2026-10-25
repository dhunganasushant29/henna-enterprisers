import Link from "next/link";
import { Halftone, JsonLd, Label, Photo } from "@/components/ui";
import type { ImageName } from "@/data/images";
import { cn } from "@/lib/cn";
import { breadcrumbLd } from "@/lib/seo";
import styles from "./PageHero.module.css";

type Crumb = { name: string; path: string };

type Props = {
  label: string;
  /** Wrap highlighted words in <em> for the italic brand-red accent. */
  title: React.ReactNode;
  intro: React.ReactNode;
  /** Trail after "Home". The last item is the current page. */
  crumbs: Crumb[];
  aside?: React.ReactNode;
  /**
   * Full-width background photo. The text turns white over a dark gradient; the photo is the
   * page's main image, so it loads first and brings its alt text and ImageObject schema.
   */
  image?: { name: ImageName; alt: string; focus?: string; flip?: boolean };
  /** Buttons shown under the intro. */
  children?: React.ReactNode;
};

/** Hero for inner pages: breadcrumb (with BreadcrumbList schema), headline, intro, optional aside and background photo. */
export function PageHero({ label, title, intro, crumbs, aside, image, children }: Props) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className={cn(styles.hero, image && styles.withImage)}>
      {image ? (
        <div className={styles.bg}>
          <Photo
            name={image.name}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className={styles.bgImg}
            style={{ objectPosition: image.focus, transform: image.flip ? "scaleX(-1)" : undefined }}
          />
          <div aria-hidden className={styles.shade} />
        </div>
      ) : (
        <Halftone tone="brand" from="fromTopRight" className={styles.dots} />
      )}
      <div className={styles.inner}>
        <div className={styles.main}>
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              {trail.map((c, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={c.path} className={styles.crumb}>
                    {last ? (
                      <span aria-current="page" className={styles.current}>
                        {c.name}
                      </span>
                    ) : (
                      <>
                        <Link href={c.path}>{c.name}</Link>
                        <span aria-hidden>/</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <Label dark={Boolean(image)} className={styles.label}>
            {label}
          </Label>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.intro}>{intro}</div>
          {children ? <div className={styles.actions}>{children}</div> : null}
        </div>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>
      <JsonLd data={breadcrumbLd(trail)} />
    </section>
  );
}
