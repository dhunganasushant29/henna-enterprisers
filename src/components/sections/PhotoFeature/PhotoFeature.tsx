import { Photo } from "@/components/ui";
import type { ImageName } from "@/data/images";
import { cn } from "@/lib/cn";
import styles from "./PhotoFeature.module.css";

type Props = {
  name: ImageName;
  /** Describes what is in the photo (read by screen readers and search engines). */
  alt: string;
  /** Small red label above the caption. */
  label?: string;
  /** Caption line shown over the photo. */
  title?: string;
  /** "banner": wide strip; "card": a taller block for a side column. */
  shape?: "banner" | "card";
  /** Which part of the photo to keep in view when it is cropped (CSS object-position). */
  focus?: string;
  priority?: boolean;
  className?: string;
};

/**
 * A captioned photo (<figure> + <figcaption>), used to give each page its own image.
 * The photo brings its blurred preview and ImageObject schema (with the photographer credit) from <Photo>.
 */
export function PhotoFeature({ name, alt, label, title, shape = "banner", focus, priority, className }: Props) {
  return (
    <figure className={cn(styles.figure, styles[shape], className)}>
      <Photo
        name={name}
        alt={alt}
        fill
        priority={priority}
        sizes={shape === "banner" ? "(min-width: 1200px) 72rem, 100vw" : "(min-width: 1024px) 30rem, 100vw"}
        className={styles.img}
        style={focus ? { objectPosition: focus } : undefined}
      />
      {label || title ? (
        <figcaption className={styles.caption}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {title ? <span className={styles.title}>{title}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
