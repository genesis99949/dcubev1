import Image, { type ImageProps } from "next/image";
import imageVariants from "@/content/image-variants.json";

const variants: Record<string, { width: number; src: string }[]> = imageVariants;
/** Responsive assets generated ahead of time; works with the serverless static export. */
export function SiteImage(props: ImageProps) {
  const images = typeof props.src === "string" ? variants[props.src] : undefined;
  if (!images) return <Image {...props} alt={props.alt} />;
  // A native picture supplies srcset even with Next's server optimizer disabled.
  return (
    // Keep non-fill pictures as one grid item (the source must not take a column).
    <picture style={{ display: props.fill ? "contents" : "block", minWidth: 0 }}>
      <source type="image/webp" srcSet={images.map((image) => `${image.src} ${image.width}w`).join(", ")} sizes={props.sizes ?? "100vw"} />
      <Image {...props} alt={props.alt} />
    </picture>
  );
}
