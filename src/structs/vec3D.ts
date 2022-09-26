export type Vec3D = Float32Array;

export const initVec3D = (x: number, y: number, z: number, w: number = 1): Vec3D =>
  new Float32Array([
    x,
    y,
    z,
    w,
  ]);

export const crossProduct = (a: Vec3D, b: Vec3D): Vec3D =>
  initVec3D(
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  );

export const dotProduct = (a: Vec3D, b: Vec3D) => (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);

export const divVec = (a: Vec3D, k: number) =>
  initVec3D(
    a[0] / k,
    a[1] / k,
    a[2] / k,
  );

export const multVec = (a: Vec3D, k: number) =>
  initVec3D(
    a[0] * k,
    a[1] * k,
    a[2] * k,
  );

export const addVec = (a: Vec3D, b: Vec3D) =>
  initVec3D(
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2],
  );

export const subVec = (a: Vec3D, b: Vec3D) =>
  initVec3D(
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2],
  );

export const normalizeVec = (a: Vec3D): Vec3D => divVec(a, vecLen(a));

export const vecLen = (a: Vec3D) => Math.sqrt(dotProduct(a, a));
