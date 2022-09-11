import { Mat4x4 } from "../structs";

export const rotateYMatrix = (
  o: Mat4x4,
  theta: number,
) => {
  o[0][0] = Math.cos(theta);
  o[0][2] = Math.sin(theta);
  o[1][1] = 1;
  o[2][0] = -Math.sin(theta);
  o[2][2] = Math.cos(theta);
};
