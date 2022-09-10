import { Mat4x4 } from "../structs";

export const rotateXMatrix = (
  o: Mat4x4,
  theta: number,
) => {
  o[0][0] = 1;
  o[1][1] = Math.cos(theta);
  o[1][2] = Math.sin(theta);
  o[2][1] = -Math.sin(theta);
  o[2][2] = Math.cos(theta);
  o[3][3] = 1;
};
