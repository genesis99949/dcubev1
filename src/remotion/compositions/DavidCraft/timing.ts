import { toFrames } from "../../config";
import { POUR_SECONDS } from "./components/Pour";

// David Craft Ale — scene lengths in SECONDS. Scenes are joined by the pour transition
// (POUR_SECONDS each), so a sequence's total = sum(scenes) − pours × POUR_SECONDS.

// Scenes after the first start under the pour: their own animation begins at POUR_REVEAL,
// and the last ~0.8 s of every scene but the last is covered by the next pour.
export const DCA_IDENTITY = {
  logo: 5.4,
  splash: 6.6,
  four: 7.0,
  outro: 4.8,
} as const;

/** Website films: each scene plays a recording from public/remotion/dca (`from` = trim, seconds). */
export const DCA_SITE = {
  home: { file: "home.mp4", from: 0, seconds: 21 },
  // Origin → split → the seven-step brewery journey → courtyard.
  story: { file: "story.mp4", from: 0, seconds: 23.5 },
  beer: { file: "beer.mp4", from: 0, seconds: 11 },
  // Arrives through a pour; its recording starts as the bands unwind.
  hopper: { file: "hopper.mp4", from: 0.2, seconds: 11.8 },
  products: { file: "products.mp4", from: 1.0, seconds: 12 },
  mobile: { seconds: 11 },
} as const;

const total = (scenes: number[], fps: number) =>
  scenes.reduce((sum, s) => sum + toFrames(s, fps), 0) - (scenes.length - 1) * toFrames(POUR_SECONDS, fps);

export const getDcaIdentityDuration = (fps: number) => total(Object.values(DCA_IDENTITY), fps);
export const getDcaProductDuration = (fps: number) => total([DCA_SITE.beer.seconds, DCA_SITE.hopper.seconds], fps);
/** Single-recording films last as long as their recording. */
export const getDcaSiteDuration = (scene: "home" | "story" | "products" | "mobile", fps: number) =>
  toFrames(DCA_SITE[scene].seconds, fps);
