import { each } from "./js-std";
import { Mesh, Vec3D } from "./structs";

export const loadToMesh = async (path: string): Promise<Mesh> => {
  const res = await fetch(path, {
    method: "GET",
    headers: {
      "Accept": "text/html",
    },
  });
  // FIXME: we might want a stream instead of a whole file here
  const txt = await res.text();

  const lines = txt.split("\n");
  const vecPool: Vec3D[] = [];
  const mesh: Mesh = { tris: [] };

  each(lines, (line) => {
    if (line.startsWith("v")) {
      const [, x, y, z] = line.split(" ");

      vecPool.push([parseFloat(x), parseFloat(y), parseFloat(z)]);
    }

    if (line.startsWith("f")) {
      const [, idxX, idxY, idxZ] = line.split(" ");

      mesh.tris.push(
        {
          color: "black",
          p: [vecPool[parseInt(idxX) - 1], vecPool[parseInt(idxY) - 1], vecPool[parseInt(idxZ) - 1]],
        },
      );
    }
  });

  return mesh;
};
