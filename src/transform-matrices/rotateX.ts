import type { Mat4x4 } from "../structs";

export const rotateXMatrix = (
  theta: number,
): Mat4x4 => [
  [1, 0, 0, 0],
  [0, Math.cos(theta), Math.sin(theta), 0],
  [0, -Math.sin(theta), Math.cos(theta), 0],
  [0, 0, 0, 1],
];
