export const makeTicker = (changeRate = 1) => {
  const foo = 1000 / changeRate;

  return ({
    tick: () => new Date().getTime() / foo,
  });
};
