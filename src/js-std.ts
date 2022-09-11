// Basic utility functions
// to not rely on js std which is not very performant

export const each = <T>(list: T[], fn: (item: T, index: number) => void) => {
  let i = 0;
  let l = list.length;

  while (i < l) {
    fn(list[i], i);
    i++;
  }
};

export function* batchConsumer<T>(batchSize: number, list: T[]) {
  let currentSlice = 0;

  while (true) {
    const slice = list.slice(currentSlice * batchSize, (currentSlice + 1) * batchSize);
    yield slice;

    if (!slice.length) {
      return;
    }

    currentSlice++;
  }
}
