import { useVideoConfig } from "remotion";

/**
 * Resolution-independent layout values. Size everything in `unit`s
 * (1 unit = 1px at 1080p) so a composition works at 1920×1080, 1080×1920, 4K…
 */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const unit = Math.min(width, height) / 1080;

  return {
    width,
    height,
    unit,
    isPortrait: height > width,
    /** Safe-area margin: keep key content inside it. */
    margin: Math.round(100 * unit),
  };
};
