import {
  addVec,
  crossProduct,
  divVec,
  dotProduct,
  initMatIdentity,
  initTriangle,
  initVec3D,
  matMultMat,
  matMultVec3D,
  normalizeVec,
  quickInverseMat,
  subVec,
} from "./structs";
import type { Triangle } from "./structs";

import { canvasFill, makeTriangleDrawer, makeTriangleFiller } from "./canvasDrawers";
import { CanvasWrapper } from "./canvasWrapper";
import { loadToMesh } from "./objLoader";
import { makeTicker } from "./ticker";
import { pointAtMatrix, projMatrix, rotateMatrix, translateMatrix } from "./transform-matrices";
import { userInputHandler } from "./userInput";

(async function init() {
  const manager = CanvasWrapper("cartesianCanvas", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const fill = canvasFill(manager);
  const fillTriangle = makeTriangleFiller(manager);
  const drawTriangle = makeTriangleDrawer(manager);
  const inputs = userInputHandler();
  const ticker = makeTicker();
  const vCamera = initVec3D(0, 0, 0);
  let vLookDir = initVec3D(0, 0, 0);

  const loadedMesh = await loadToMesh(`models/VideoShip.obj`);
  let fTheta = 0;

  // just named indexes
  const x = 0;
  const y = 1;
  const z = 2;
  const w = 3;

  function renderLoop(elapsedTime: number) {
    // Clear canvas
    fill(0, 0, manager.width, manager.height, "black");
    // fTheta = elapsedTime;

    const matProj = projMatrix({
      fAspectRatio: manager.aspectRatio,
    });

    const matWorld = matMultMat(
      initMatIdentity(),
      matMultMat(
        rotateMatrix(0, fTheta, fTheta * 0.5),
        translateMatrix(0, 0, 10),
      ),
    );

    vLookDir = initVec3D(0, 0, 1);
    const vUp = initVec3D(0, 1, 0);
    const vTarget = addVec(vCamera, vLookDir);

    if (inputs.up) {
      vCamera[y] += 0.1;
    }
    if (inputs.down) {
      vCamera[y] -= 0.1;
    }
    if (inputs.left) {
      vCamera[x] += 0.1;
    }
    if (inputs.right) {
      vCamera[x] -= 0.1;
    }

    const matCamera = pointAtMatrix(vCamera, vTarget, vUp);
    const matView = quickInverseMat(matCamera);

    const vecTrianglesToRaster: {
      tri: Triangle;
      zMean: number;
    }[] = [];

    // Draw triangles
    for (const tri of loadedMesh.tris) {
      // Rotate in all axis
      const triTransformed: Triangle = initTriangle({
        p: [
          matMultVec3D(matWorld, tri.p[x]),
          matMultVec3D(matWorld, tri.p[y]),
          matMultVec3D(matWorld, tri.p[z]),
        ],
      });

      // Use Cross-Product to get surface normal
      const line1 = subVec(triTransformed.p[1], triTransformed.p[0]);
      const line2 = subVec(triTransformed.p[2], triTransformed.p[0]);

      // Normalized the normal
      const normal = normalizeVec(crossProduct(line1, line2));

      const vCameraRay = subVec(triTransformed.p[0], vCamera);

      if (dotProduct(normal, vCameraRay) < 0) {
        const lightDirection = normalizeVec(initVec3D(0, 1, -1));
        const dp = dotProduct(normal, lightDirection);

        // World to view space
        const triViewed = initTriangle({
          p: [
            matMultVec3D(matView, triTransformed.p[x]),
            matMultVec3D(matView, triTransformed.p[y]),
            matMultVec3D(matView, triTransformed.p[z]),
          ],
        });

        const triProjected = initTriangle({
          // choose color based on light
          color: `hsl(281, 100%, ${Math.max(dp * 100, 10)}%)`,
          // project 3D -> 2D
          p: [
            matMultVec3D(matProj, triViewed.p[x]),
            matMultVec3D(matProj, triViewed.p[y]),
            matMultVec3D(matProj, triViewed.p[z]),
          ],
        });

        // Scale into view
        triProjected.p[0] = divVec(triProjected.p[0], triProjected.p[0][w]);
        triProjected.p[1] = divVec(triProjected.p[1], triProjected.p[1][w]);
        triProjected.p[2] = divVec(triProjected.p[2], triProjected.p[2][w]);

        const vOffsetView = initVec3D(1, 1, 0);

        // Scale into view
        triProjected.p[0] = addVec(triProjected.p[0], vOffsetView);
        triProjected.p[1] = addVec(triProjected.p[1], vOffsetView);
        triProjected.p[2] = addVec(triProjected.p[2], vOffsetView);
        for (const p of triProjected.p) {
          p[x] *= 0.5 * manager.width;
          p[y] *= 0.5 * manager.height;
        }

        vecTrianglesToRaster.push({
          tri: triProjected,
          zMean: (triProjected.p[0][z] + triProjected.p[1][z] + triProjected.p[2][z]),
        });
      }

      const painterSorted = vecTrianglesToRaster.sort((a, b) => {
        return b.zMean - a.zMean;
      });

      for (const info of painterSorted) {
        const tri = info.tri;
        fillTriangle(
          tri.p[0][x],
          tri.p[0][y],
          tri.p[1][x],
          tri.p[1][y],
          tri.p[2][x],
          tri.p[2][y],
          tri.color,
        );

        // drawTriangle(
        //   tri.p[0][x],
        //   tri.p[0][y],
        //   tri.p[1][x],
        //   tri.p[1][y],
        //   tri.p[2][x],
        //   tri.p[2][y],
        //   "white",
        // );
      }
    }

    // Render pipeline
    window.requestAnimationFrame(() => renderLoop(ticker.tick()));
  }

  (function initialFrame() {
    fill(0, 0, manager.width, manager.height, "black");

    window.requestAnimationFrame(() => renderLoop(ticker.tick()));
  })();
})();
