import { Vec3D } from "./vec3D";

export type Mat4x4 = [
  row: [col: number, col: number, col: number, col: number],
  row: [col: number, col: number, col: number, col: number],
  row: [col: number, col: number, col: number, col: number],
  row: [col: number, col: number, col: number, col: number],
];

export const initMat4x4 = (): Mat4x4 => {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
};

// FIXME: its better to do output style like C?
export const multMatVec3D = (i: Vec3D, o: Vec3D, m: Mat4x4) => {
  const x = 0;
  const y = 1;
  const z = 2;

  o[x] = i[x] * m[0][0] + i[y] * m[1][0] + i[z] * m[2][0] + m[3][0];
  o[y] = i[x] * m[0][1] + i[y] * m[1][1] + i[z] * m[2][1] + m[3][1];
  o[z] = i[x] * m[0][2] + i[y] * m[1][2] + i[z] * m[2][2] + m[3][2];

  // here we imply m[3][3] = 1
  const w = i[x] * m[0][3] + i[y] * m[1][3] + i[z] * m[2][3] + m[3][3];

  if (w !== 0) {
    o[x] /= w;
    o[y] /= w;
    o[z] /= w;
  }
};
