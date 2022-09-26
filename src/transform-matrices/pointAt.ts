import type { Mat4x4 } from "../structs";
import { crossProduct, dotProduct, initMat4x4, multVec, normalizeVec, subVec, Vec3D } from "../structs";

export const pointAtMatrix = (
  pos: Vec3D,
  target: Vec3D,
  up: Vec3D,
): Mat4x4 => {
  const newForward = normalizeVec(subVec(target, pos));

  const a = multVec(newForward, dotProduct(up, newForward));
  const newUp = normalizeVec(subVec(up, a));

  const newRight = crossProduct(newUp, newForward);

  return initMat4x4(
    [newRight[0], newRight[1], newRight[2], 0],
    [newUp[0], newUp[1], newUp[2], 0],
    [newForward[0], newForward[1], newForward[2], 0],
    [pos[0], pos[1], pos[2], 1],
  );
};
