import Image from "next/image";
import type { Media } from "@/content/projects";
import { LoopVideo } from "./LoopVideo";

type ProjectMediaProps = {
  media: Media;
  /** Rendered width hint for responsive images, e.g. "(max-width: 760px) 100vw, 50vw". */
  sizes: string;
  className?: string;
  /** Native video controls (project pages). */
  controls?: boolean;
  /** Load immediately (above-the-fold images). */
  eager?: boolean;
};

/**
 * Vimeo player params. `background=1` = autoplay, loop, muted, no playbar or controls
 * (needs a paid Vimeo plan on the uploader's account; free accounts ignore it).
 */
const vimeoSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?${new URLSearchParams({
    background: "1",
    autopause: "0",
    badge: "0",
    dnt: "1",
    player_id: "0",
    app_id: "58479",
  })}`;

/** An optimised image, a muted looping video or a Vimeo embed, depending on the media kind. */
export function ProjectMedia({ media, sizes, className, controls, eager }: ProjectMediaProps) {
  if (media.kind === "vimeo") {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          aspectRatio: `${media.width} / ${media.height}`,
          background: "var(--ink)",
        }}
      >
        <iframe
          src={vimeoSrc(media.id)}
          title={media.alt}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading={eager ? "eager" : "lazy"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  if (media.kind === "video") {
    return (
      <LoopVideo
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        label={media.alt}
        controls={controls}
        className={className}
      />
    );
  }

  return (
    <Image
      src={media.src}
      width={media.width}
      height={media.height}
      alt={media.alt}
      sizes={sizes}
      className={className}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
