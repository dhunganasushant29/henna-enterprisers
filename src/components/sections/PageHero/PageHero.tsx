import Link from "next/link";
import { Halftone, JsonLd, Label } from "@/components/ui";
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
  /** Buttons shown under the intro. */
  children?: React.ReactNode;
};

/** Hero for inner pages: breadcrumb (with BreadcrumbList schema), headline, intro and optional aside. */
export function PageHero({ label, title, intro, crumbs, aside, children }: Props) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className={styles.hero}>
      <Halftone tone="brand" from="fromTopRight" className={styles.dots} />
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
          <Label className={styles.label}>{label}</Label>
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
