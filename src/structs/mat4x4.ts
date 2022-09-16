import { initVec3D, Vec3D } from "./vec3D";

type RawRow = [col: number, col: number, col: number, col: number];

export type Mat4x4 = [
  row: Float32Array,
  row: Float32Array,
  row: Float32Array,
  row: Float32Array,
];

export const initMat4x4 = (
  r1: RawRow = [0, 0, 0, 0],
  r2: RawRow = [0, 0, 0, 0],
  r3: RawRow = [0, 0, 0, 0],
  r4: RawRow = [0, 0, 0, 0],
): Mat4x4 => [
  new Float32Array(r1),
  new Float32Array(r2),
  new Float32Array(r3),
  new Float32Array(r4),
];

export const initMatIdentity = (): Mat4x4 =>
  initMat4x4(
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  );

export const matMultVec3D = (m: Mat4x4, i: Vec3D): Vec3D =>
  initVec3D(
    i[0] * m[0][0] + i[1] * m[1][0] + i[2] * m[2][0] + i[3] * m[3][0],
    i[0] * m[0][1] + i[1] * m[1][1] + i[2] * m[2][1] + i[3] * m[3][1],
    i[0] * m[0][2] + i[1] * m[1][2] + i[2] * m[2][2] + i[3] * m[3][2],
    i[0] * m[0][3] + i[1] * m[1][3] + i[2] * m[2][3] + i[3] * m[3][3],
  );

export const matMultMat = (a: Mat4x4, b: Mat4x4): Mat4x4 => {
  const matrix = initMat4x4();

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      matrix[r][c] = a[r][0] * b[0][c] + a[r][1] * b[1][c] + a[r][2] * b[2][c]
        + a[r][3] * b[3][c];
    }
  }

  return matrix;
};
