export type Vec3D = [x: number, y: number, z: number];

export const crossProduct = (a: Vec3D, b: Vec3D): Vec3D => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

export const dotProduct = (a: Vec3D, b: Vec3D): number => (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);

export const subVec = (a: Vec3D, b: Vec3D): Vec3D => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
