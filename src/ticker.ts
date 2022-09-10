export const makeTicker = () => ({
  tick: () => new Date().getTime() / 1000,
});
