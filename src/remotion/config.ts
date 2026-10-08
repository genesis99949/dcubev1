// Global video format. Change these values and every composition follows:
// layouts scale from `useLayout()` and all timing is written in seconds,
// so changing fps keeps the real-time speed of every animation.

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

// Common formats. Use e.g. `{...FORMATS.vertical}` on a <Composition>.
export const FORMATS = {
  landscape: { width: 1920, height: 1080 },
  square: { width: 1080, height: 1080 },
  vertical: { width: 1080, height: 1920 },
  uhd: { width: 3840, height: 2160 },
} as const;

/** Seconds → whole frames. */
export const toFrames = (seconds: number, fps: number) =>
  Math.round(seconds * fps);
