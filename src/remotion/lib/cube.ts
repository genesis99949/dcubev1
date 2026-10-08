// Cube geometry shared by the website (interactive hero cube) and Remotion (brand film).
// Pure math — no React, no Remotion. Uses CSS 3D conventions: x right, y DOWN, z toward
// the viewer; the cube is rotated with `rotateX(pitch) rotateY(yaw)`.

export type Vec3 = readonly [number, number, number];

export type CubeFace = {
  /** CSS transform that places a square face on the cube (before translateZ). */
  place: string;
  /** Outward normal in CSS coordinates. */
  normal: Vec3;
  /** Cube orientation (degrees) that shows this face to the viewer. */
  pitch: number;
  yaw: number;
};

/**
 * The six faces, in service order. Opposite faces share an axis:
 * 01/02 = left/right (Web), 03/04 = top/bottom (Branding), 05/06 = front/back (Marketing).
 */
export const CUBE_FACES: CubeFace[] = [
  { place: "rotateY(-90deg)", normal: [-1, 0, 0], pitch: 0, yaw: 90 },
  { place: "rotateY(90deg)", normal: [1, 0, 0], pitch: 0, yaw: -90 },
  { place: "rotateX(90deg)", normal: [0, -1, 0], pitch: -90, yaw: 0 },
  { place: "rotateX(-90deg)", normal: [0, 1, 0], pitch: 90, yaw: 0 },
  { place: "rotateY(0deg)", normal: [0, 0, 1], pitch: 0, yaw: 0 },
  { place: "rotateY(180deg)", normal: [0, 0, -1], pitch: 0, yaw: 180 },
];

/** Three-quarter view: the active face faces you, two neighbours show in perspective. */
const VIEW_PITCH = -20;
const VIEW_YAW = 32;

/** Orientation (degrees) that presents face `i` in a three-quarter view. */
export const orientationFor = (i: number) => {
  const face = CUBE_FACES[i];
  // Top/bottom faces: tilt back towards the front instead of over-rotating.
  const pitch = face.pitch === 0 ? VIEW_PITCH : face.pitch - Math.sign(face.pitch) * Math.abs(VIEW_PITCH);
  return { pitch, yaw: face.yaw + VIEW_YAW };
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Apply rotateX(pitch) rotateY(yaw) to a vector (degrees), CSS conventions. */
export const rotateVec = ([x, y, z]: Vec3, pitch: number, yaw: number): Vec3 => {
  const ry = rad(yaw);
  const rx = rad(pitch);
  const x1 = x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
};

const LIGHT: Vec3 = (() => {
  const l: Vec3 = [-0.35, -0.7, 0.62];
  const n = Math.hypot(...l);
  return [l[0] / n, l[1] / n, l[2] / n];
})();

/** How much a face faces the light (0 = away, 1 = full) for the current orientation. */
export const faceLight = (i: number, pitch: number, yaw: number) => {
  const n = rotateVec(CUBE_FACES[i].normal, pitch, yaw);
  return Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
};

/** How much a face points at the viewer (≤ 0 = hidden). */
export const faceFacing = (i: number, pitch: number, yaw: number) =>
  rotateVec(CUBE_FACES[i].normal, pitch, yaw)[2];

/** Shortest signed angle (degrees) from a to b. */
export const angleDelta = (a: number, b: number) => {
  let d = (b - a) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
};
