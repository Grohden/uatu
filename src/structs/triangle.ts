import { Vec3D } from "./vec3D";

export type Triangle = {
  p: [p1: Vec3D, p2: Vec3D, p3: Vec3D];
  color: string;
};

export const initTriangle = (color = "black"): Triangle => ({
  color,
  p: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
});

export const copyTriangle = (original: Triangle): Triangle => ({
  color: original.color,
  p: [
    [...original.p[0]],
    [...original.p[1]],
    [...original.p[2]],
  ],
});
