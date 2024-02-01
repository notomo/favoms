export const homeRoute = "/" as const;

export const collectionRoute = "/collection" as const;

export const allItemsRoute = `/collection/all` as const;

export const mylistRoute = (mylistId: number) => {
  return `/collection/mylist/${mylistId}` as const;
};

export const mylistItemRoute = (mylistId: number, itemId: number) => {
  return `/collection/mylist/${mylistId}/item/${itemId}` as const;
};

export const collectionItemRoute = (itemId: number) => {
  return `/collection/all/item/${itemId}` as const;
};

export const itemRoute = (itemId: number) => {
  return `/item/${itemId}` as const;
};
