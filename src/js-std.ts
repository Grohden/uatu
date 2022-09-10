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
