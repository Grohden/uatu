import { CanvasWrapper } from "./canvasWrapper";

export const canvasFill = (wrapper: ReturnType<typeof CanvasWrapper>) =>
(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
) => {
  const { context } = wrapper;

  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};

export const makeLineDrawer = (wrapper: ReturnType<typeof CanvasWrapper>) =>
(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
) => {
  const { context } = wrapper;

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
};

export const makeTriangleDrawer = (lineDrawer: ReturnType<typeof makeLineDrawer>) =>
(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  color: string,
) => {
  lineDrawer(x1, y1, x2, y2, color);
  lineDrawer(x2, y2, x3, y3, color);
  lineDrawer(x3, y3, x1, y1, color);
};

export const makeTriangleFiller = (wrapper: ReturnType<typeof CanvasWrapper>) =>
(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  color: string,
) => {
  const { context } = wrapper;

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x1, y1);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};
