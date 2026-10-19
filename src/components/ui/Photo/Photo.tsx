import Image, { type ImageProps } from "next/image";
import { images, type ImageName } from "@/data/images";

type Props = Omit<ImageProps, "src" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  name: ImageName;
  /** Fill the nearest positioned parent instead of using intrinsic size. */
  fill?: boolean;
};

/**
 * Photo from the generated manifest. Gets correct dimensions (no layout shift),
 * a blurred preview while loading, responsive WebP sources and native lazy loading.
 */
export function Photo({ name, fill, alt, ...rest }: Props) {
  const img = images[name];
  return (
    <Image
      src={img.src}
      alt={alt}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      {...(fill ? { fill: true } : { width: img.width, height: img.height })}
      {...rest}
    />
  );
}
