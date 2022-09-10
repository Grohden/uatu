export function CanvasWrapper(id: string) {
  const canvas = document.getElementById(id) as HTMLCanvasElement;

  if (!canvas) {
    throw new Error("No canvas found");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No context found");
  }

  // FIXME: make this more dynamic (?)
  canvas.width = 780;
  canvas.height = 780;

  return {
    context: ctx,
    get width() {
      return canvas.width | 0;
    },
    get height() {
      return canvas.height | 0;
    },
    get aspectRatio() {
      return this.height / this.width;
    },
    updateDimensions: () => {
      const minor = Math.min(window.innerHeight, window.innerWidth);

      canvas.width = minor * 0.95;
      canvas.height = minor * 0.95;
    },
  };
}
