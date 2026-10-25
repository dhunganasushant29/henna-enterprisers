import Image, { type ImageProps } from "next/image";
import { photoCredits } from "@/data/photoCredits";
import { images, type ImageName } from "@/data/images";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "../JsonLd";

type Props = Omit<ImageProps, "src" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  name: ImageName;
  /** Fill the nearest positioned parent instead of using intrinsic size. */
  fill?: boolean;
};

/**
 * Photo from the generated manifest. Gets correct dimensions (no layout shift),
 * a blurred preview while loading, responsive WebP sources and native lazy loading.
 * Photos with a known credit also emit ImageObject schema (creator, credit, licence),
 * which search engines use for image results and the "Licensable" badge.
 */
export function Photo({ name, fill, alt, ...rest }: Props) {
  const img = images[name];
  const credit = photoCredits[name];
  return (
    <>
      <Image
        src={img.src}
        alt={alt}
        placeholder="blur"
        blurDataURL={img.blurDataURL}
        {...(fill ? { fill: true } : { width: img.width, height: img.height })}
        {...rest}
      />
      {credit ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ImageObject",
            contentUrl: absoluteUrl(`${img.src}-1600.webp`),
            width: img.width,
            height: img.height,
            caption: alt,
            creditText: credit.own ? credit.author : `${credit.author} / Unsplash`,
            creator: credit.own ? { "@type": "Organization", name: site.name } : { "@type": "Person", name: credit.author },
            copyrightNotice: credit.own ? site.name : credit.author,
            license: credit.own ? absoluteUrl("/") : "https://unsplash.com/license",
            acquireLicensePage: credit.page ?? absoluteUrl("/contact/"),
          }}
        />
      ) : null}
    </>
  );
}
