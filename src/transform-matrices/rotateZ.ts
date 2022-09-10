import { Mat4x4 } from "../structs";

export const rotateZMatrix = (
  o: Mat4x4,
  theta: number,
) => {
  o[0][0] = Math.cos(theta);
  o[0][1] = Math.sin(theta);
  o[1][0] = -Math.sin(theta);
  o[1][1] = Math.cos(theta);
  o[2][2] = 1;
  o[3][3] = 1;
};
