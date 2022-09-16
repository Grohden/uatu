import type { Mat4x4 } from "../structs";

export const projMatrix = (
  {
    fAspectRatio,
    fNear = 0.1,
    fFar = 1000,
    fFov = 90,
  }: {
    fAspectRatio: number;
    fNear?: number;
    fFar?: number;
    fFov?: number;
  },
): Mat4x4 => {
  const fFovRad = 1 / Math.tan(fFov * 0.5 / 180 * Math.PI);

  return [
    [fAspectRatio * fFovRad, 0, 0, 0],
    [0, fFovRad, 0, 0],
    [0, 0, fFar / (fFar - fNear), 1],
    [0, 0, (-fFar * fNear) / (fFar - fNear), 0],
  ];
};
