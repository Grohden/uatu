import { copyTriangle, initTriangle, Mesh } from "./structs";

import { canvasFill, makeLineDrawer, makeTriangleDrawer } from "./canvasDrawers";
import { CanvasWrapper } from "./canvasWrapper";
import { each } from "./js-std";
import { initMat4x4 } from "./structs";
import { multMatVec3D } from "./structs/mat4x4";
import { makeTicker } from "./ticker";
import { projMatrix, rotateXMatrix, rotateZMatrix } from "./transform-matrices";

(function init() {
  const manager = CanvasWrapper("cartesianCanvas");
  const fill = canvasFill(manager);
  const drawLine = makeLineDrawer(manager);
  const drawTriangle = makeTriangleDrawer(drawLine);
  const ticker = makeTicker();
  let fTheta = 0;

  const meshCube: Mesh = {
    tris: [
      // SOUTH
      [[0, 0, 0], [0, 1, 0], [1, 1, 0]],
      [[0, 0, 0], [1, 1, 0], [1, 0, 0]],

      // EAST
      [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
      [[1, 0, 0], [1, 1, 1], [1, 0, 1]],

      // NORTH
      [[1, 0, 1], [1, 1, 1], [0, 1, 1]],
      [[1, 0, 1], [0, 1, 1], [0, 0, 1]],

      // WEST
      [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
      [[0, 0, 1], [0, 1, 0], [0, 0, 0]],

      // TOP
      [[0, 1, 0], [0, 1, 1], [1, 1, 1]],
      [[0, 1, 0], [1, 1, 1], [1, 1, 0]],

      // BOTTOM
      [[1, 0, 1], [0, 0, 1], [0, 0, 0]],
      [[1, 0, 1], [0, 0, 0], [1, 0, 0]],
    ],
  };

  const matProj = initMat4x4();

  function renderLoop(elapsedTime: number) {
    // Clear canvas
    fill(0, 0, manager.width, manager.height, "white");

    const matRotZ = initMat4x4();
    const matRotX = initMat4x4();

    fTheta = elapsedTime;

    rotateZMatrix(matRotX, fTheta);
    rotateXMatrix(matRotZ, fTheta * 0.5);

    // Draw triangles
    each(meshCube.tris, (tri) => {
      // Rotate in z-axis
      const triRotatedZ = initTriangle();
      each(tri, (p, i) => {
        multMatVec3D(p, triRotatedZ[i], matRotZ);
      });

      // Rotate in x-axis
      const triRotatedZX = initTriangle();
      each(triRotatedZ, (p, i) => {
        multMatVec3D(p, triRotatedZX[i], matRotX);
      });

      // offset into the screen
      const triTranslated = copyTriangle(triRotatedZX);
      each(triTranslated, (p, i) => {
        p[2] += 3;
      });

      // project 3D to 2D
      const triProjected = initTriangle();
      each(triTranslated, (p, i) => {
        multMatVec3D(p, triProjected[i], matProj);
      });

      projMatrix(matProj, {
        fAspectRatio: manager.aspectRatio,
      });

      // Scale into view
      each(triProjected, (p, i) => {
        p[0] = (p[0] + 1) * (0.5 * manager.width);
        p[1] = (p[1] + 1) * (0.5 * manager.height);
      });

      drawTriangle(
        triProjected[0][0],
        triProjected[0][1],
        triProjected[1][0],
        triProjected[1][1],
        triProjected[2][0],
        triProjected[2][1],
        "white",
      );
    });

    // Render pipeline
    window.requestAnimationFrame(() => renderLoop(ticker.tick()));
  }

  (function initialFrame() {
    window.requestAnimationFrame(() => renderLoop(ticker.tick()));
  })();
})();
