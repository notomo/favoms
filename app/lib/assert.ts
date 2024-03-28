export const assertNever = (x: never) => {
  throw new Error(`unexpected value: ${x}`);
};
