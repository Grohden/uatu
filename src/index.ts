import { copyTriangle, crossProduct, dotProduct, initTriangle, Triangle, Vec3D } from "./structs";

import { canvasFill, makeLineDrawer, makeTriangleDrawer, makeTriangleFiller } from "./canvasDrawers";
import { CanvasWrapper } from "./canvasWrapper";
import { each } from "./js-std";
import { loadToMesh } from "./obj-loader";
import { initMat4x4 } from "./structs";
import { multMatVec3D } from "./structs/mat4x4";
import { subVec } from "./structs/vec3D";
import { makeTicker } from "./ticker";
import { projMatrix, rotateXMatrix, rotateZMatrix } from "./transform-matrices";

(async function init() {
  const manager = CanvasWrapper("cartesianCanvas");
  const fill = canvasFill(manager);
  const drawLine = makeLineDrawer(manager);
  const fillTriangle = makeTriangleFiller(manager);
  const drawTriangle = makeTriangleDrawer(drawLine);
  const ticker = makeTicker();
  const vCamera: Vec3D = [0, 0, 0];

  // const meshCube: Mesh = {
  //   tris: [
  //     // SOUTH
  //     [[0, 0, 0], [0, 1, 0], [1, 1, 0]],
  //     [[0, 0, 0], [1, 1, 0], [1, 0, 0]],
  //
  //     // EAST
  //     [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
  //     [[1, 0, 0], [1, 1, 1], [1, 0, 1]],
  //
  //     // NORTH
  //     [[1, 0, 1], [1, 1, 1], [0, 1, 1]],
  //     [[1, 0, 1], [0, 1, 1], [0, 0, 1]],
  //
  //     // WEST
  //     [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
  //     [[0, 0, 1], [0, 1, 0], [0, 0, 0]],
  //
  //     // TOP
  //     [[0, 1, 0], [0, 1, 1], [1, 1, 1]],
  //     [[0, 1, 0], [1, 1, 1], [1, 1, 0]],
  //
  //     // BOTTOM
  //     [[1, 0, 1], [0, 0, 1], [0, 0, 0]],
  //     [[1, 0, 1], [0, 0, 0], [1, 0, 0]],
  //   ],
  // };

  const meshCube = await loadToMesh(`models/VideoShip.obj?q=${new Date().getTime()}`);

  const matProj = initMat4x4();
  let fTheta = 0;

  // just named indexes
  const x = 0;
  const y = 1;
  const z = 2;


  function renderLoop(elapsedTime: number) {
    // Clear canvas
    fill(0, 0, manager.width, manager.height, "black");
    fTheta = elapsedTime;

    const matRotZ = initMat4x4();
    const matRotX = initMat4x4();

    rotateZMatrix(matRotX, fTheta);
    rotateXMatrix(matRotZ, fTheta * 0.5);

    const vecTrianglesToRaster: Triangle[] = [];

    // Draw triangles
    each(meshCube.tris, (tri) => {
      // Rotate in z-axis
      const triRotatedZ = initTriangle();
      each(tri.p, (p, i) => {
        multMatVec3D(p, triRotatedZ.p[i], matRotZ);
      });

      // Rotate in x-axis
      const triRotatedZX = initTriangle();
      each(triRotatedZ.p, (p, i) => {
        multMatVec3D(p, triRotatedZX.p[i], matRotX);
      });

      // offset into the screen
      const triTranslated = copyTriangle(triRotatedZX);
      each(triTranslated.p, (p) => {
        p[z] += 8;
      });

      // Use Cross-Product to get surface normal
      const line1 = subVec(triTranslated.p[1], triTranslated.p[0]);
      const line2 = subVec(triTranslated.p[2], triTranslated.p[0]);

      const normal = crossProduct(line1, line2);

      // Normalize the normal
      const l = Math.sqrt((normal[x] * normal[x]) + (normal[y] * normal[y]) + (normal[z] * normal[z]));
      normal[x] /= l;
      normal[y] /= l;
      normal[z] /= l;

      if (dotProduct(normal, subVec(triTranslated.p[0], vCamera)) < 0) {
        const lightDirection: Vec3D = [0, 0, -1];
        lightDirection[x] /= l;
        lightDirection[y] /= l;
        lightDirection[z] /= l;

        const dp = dotProduct(normal, lightDirection);

        // project 3D to 2D
        const triProjected = initTriangle(`hsl(0, 0%, ${dp * 100}%)`);
        each(triTranslated.p, (p, i) => {
          multMatVec3D(p, triProjected.p[i], matProj);
        });

        projMatrix(matProj, {
          fAspectRatio: manager.aspectRatio,
        });

        // Scale into view
        each(triProjected.p, (p) => {
          p[0] = (p[0] + 1) * (0.5 * manager.width);
          p[1] = (p[1] + 1) * (0.5 * manager.height);
        });

        vecTrianglesToRaster.push(triProjected);
      }

      const painterSorted = vecTrianglesToRaster.sort((a, b) => {
        const z1 = (a.p[0][z] + a.p[1][z] + a.p[2][z]) / 3;
        const z2 = (b.p[0][z] + b.p[1][z] + b.p[2][z]) / 3;

        return z2 - z1;
      });

      each(painterSorted, (tri) => {
        fillTriangle(
          tri.p[0][x],
          tri.p[0][y],
          tri.p[1][x],
          tri.p[1][y],
          tri.p[2][x],
          tri.p[2][y],
          tri.color,
        );

        drawTriangle(
          tri.p[0][x],
          tri.p[0][y],
          tri.p[1][x],
          tri.p[1][y],
          tri.p[2][x],
          tri.p[2][y],
          "white",
        );
      });
    });

    // Render pipeline
    window.requestAnimationFrame(() => renderLoop(ticker.tick()));
  }

  (function initialFrame() {
    fill(0, 0, manager.width, manager.height, "black");

    window.requestAnimationFrame(() => renderLoop(ticker.tick()));
  })();
})();
