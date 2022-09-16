import type { Vec3D } from "./vec3D";
import { initVec3D } from "./vec3D";

export type Triangle = {
  p: [p1: Vec3D, p2: Vec3D, p3: Vec3D];
  color: string;
};

export const initTriangle = ({
  color = "black",
  p,
}: Partial<Triangle>): Triangle => ({
  color,
  p: p || [
    initVec3D(0, 0, 0),
    initVec3D(0, 0, 0),
    initVec3D(0, 0, 0),
  ],
});

export const copyTriangle = (original: Triangle): Triangle => ({
  color: original.color,
  p: [
    initVec3D(original.p[0][0], original.p[0][1], original.p[0][2], original.p[0][3]),
    initVec3D(original.p[1][0], original.p[1][1], original.p[1][2], original.p[1][3]),
    initVec3D(original.p[2][0], original.p[2][1], original.p[2][2], original.p[2][3]),
  ],
});
