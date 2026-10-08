import { toFrames } from "../../config";

// Scene lengths in SECONDS. Edit these to change the duration of the video —
// the composition length, transitions and sound effects all follow automatically.
export const BRAND_INTRO_SECONDS = {
  intro: 3.4,
  cube: 4.8,
  outro: 3.4,
  /** Length of each transition — it overlaps the two scenes around it. */
  overlap: 0.7,
} as const;

/** Frame-based timeline for a given fps. */
export const getBrandIntroTimeline = (fps: number) => {
  const s = BRAND_INTRO_SECONDS;
  const intro = toFrames(s.intro, fps);
  const cube = toFrames(s.cube, fps);
  const outro = toFrames(s.outro, fps);
  const overlap = toFrames(s.overlap, fps);

  // Frame at which each scene starts (transitions overlap scenes).
  const cubeStart = intro - overlap;
  const outroStart = cubeStart + cube - overlap;

  return {
    intro,
    cube,
    outro,
    overlap,
    starts: { intro: 0, cube: cubeStart, outro: outroStart },
    total: intro + cube + outro - 2 * overlap,
  };
};
