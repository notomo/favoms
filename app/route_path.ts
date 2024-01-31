export const mylistsRoute = "/mylist" as const;

export const mylistRoute = (mylistId: number) => {
  return `/mylist/${mylistId}` as const;
};

export const itemRoute = (itemId: number) => {
  return `/item/${itemId}` as const;
};
