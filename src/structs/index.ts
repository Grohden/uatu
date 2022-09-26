export type { Mat4x4 } from "./mat4x4";
export type { Mesh } from "./mesh";
export type { Triangle } from "./triangle";
export type { Vec3D } from "./vec3D";

export { initMat4x4, initMatIdentity, matMultMat, matMultVec3D, quickInverseMat } from "./mat4x4";
export { copyTriangle, initTriangle } from "./triangle";
export { addVec, crossProduct, divVec, dotProduct, initVec3D, multVec, normalizeVec, subVec, vecLen } from "./vec3D";
