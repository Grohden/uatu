import { Vec3D } from "./vec3D";

export type Triangle = [p1: Vec3D, p2: Vec3D, p3: Vec3D];

export const initTriangle = (): Triangle => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const copyTriangle = (original: Triangle): Triangle => [
  [...original[0]],
  [...original[1]],
  [...original[2]],
];
