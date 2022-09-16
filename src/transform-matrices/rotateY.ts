import type { Mat4x4 } from "../structs";

export const rotateYMatrix = (
  theta: number,
): Mat4x4 => [
  [Math.cos(theta), 0, Math.sin(theta), 0],
  [0, 1, 0, 0],
  [-Math.sin(theta), 0, Math.cos(theta), 0],
  [0, 0, 0, 1],
];
