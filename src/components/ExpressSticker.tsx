/**
 * Decorative stickers for One-Page Express (the Express page hero and the homepage promo tile).
 * Hand-made artwork in public/images/express/stickers; hidden from screen readers.
 */
const STICKERS = {
  "48h": { src: "48h-express.webp", width: 640, height: 533 },
  browser: { src: "browser-zambitor.webp", width: 640, height: 585 },
  cursor: { src: "cursor-fulger.webp", width: 640, height: 585 },
  cat: { src: "pisica-laptop.webp", width: 640, height: 585 },
  rocket: { src: "racheta-express.webp", width: 640, height: 585 },
} as const;

export type StickerName = keyof typeof STICKERS;

export function ExpressSticker({ name, className, eager = false }: { name: StickerName; className?: string; eager?: boolean }) {
  const { src, width, height } = STICKERS[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small decorative WebP, already sized
    <img
      src={`/images/express/stickers/${src}`}
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
