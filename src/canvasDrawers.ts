import { CanvasWrapper } from "./canvasWrapper";

const memoizedSet = <T>(
  setter: (newValue: T) => void,
) => {
  let last: T | null = null;
  return (value: T) => {
    if (value !== last) {
      last = value;
      setter(last);
    }
  };
};

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

export const makeTriangleDrawer = (
  wrapper: ReturnType<typeof CanvasWrapper>,
  // Might cause weird behaviours
  optimized = true,
) => {
  const setStrokeColor = memoizedSet<string>((newColor) => {
    wrapper.context.strokeStyle = newColor;
  });

  return (
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
    if (optimized) {
      setStrokeColor(color);
    } else {
      context.strokeStyle = color;
    }
    context.stroke();
    context.closePath();
  };
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
  // FIXME: perf for this call is really poor
  context.fillStyle = color;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x1, y1);
  context.fill();
  context.closePath();
};
