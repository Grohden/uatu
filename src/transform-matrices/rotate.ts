import type { Mat4x4 } from "../structs";

export const rotateMatrix = (xTheta: number, yTheta: number, zTheta: number): Mat4x4 => [
  [
    Math.cos(zTheta) * Math.cos(yTheta),
    Math.cos(zTheta) * Math.sin(yTheta) * Math.sin(xTheta) - Math.sin(zTheta) * Math.cos(xTheta),
    Math.cos(zTheta) * Math.sin(yTheta) * Math.cos(xTheta) + Math.sin(zTheta) * Math.sin(xTheta),
    0,
  ],
  [
    Math.sin(zTheta) * Math.cos(yTheta),
    Math.sin(zTheta) * Math.sin(yTheta) * Math.sin(xTheta) + Math.cos(zTheta) * Math.cos(xTheta),
    Math.sin(zTheta) * Math.sin(yTheta) * Math.cos(xTheta) - Math.cos(zTheta) * Math.sin(xTheta),
    0,
  ],
  [-Math.sin(yTheta), Math.cos(yTheta) * Math.sin(xTheta), Math.cos(yTheta) * Math.cos(xTheta), 0],
  [0, 0, 0, 1],
];
