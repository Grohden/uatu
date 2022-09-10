import { Mat4x4 } from "../structs";

export const projMatrix = (
  o: Mat4x4,
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
) => {
  const fFovRad = 1 / Math.tan(fFov * 0.5 / 180 * Math.PI);

  o[0][0] = fAspectRatio * fFovRad;
  o[1][1] = fFovRad;
  o[2][2] = fFar / (fFar - fNear);
  o[3][2] = (-fFar * fNear) / (fFar - fNear);
  o[2][3] = 1;
  o[3][3] = 0;
};
