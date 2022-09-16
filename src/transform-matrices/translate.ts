import type { Mat4x4 } from "../structs";
import { initMat4x4 } from "../structs";

export const translateMatrix = (
  x: number,
  y: number,
  z: number,
): Mat4x4 =>
  initMat4x4(
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [x, y, z, 1],
  );
