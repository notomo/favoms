export const homeRoute = "/" as const;

export const collectionRoute = "/collection" as const;

export const allItemsRoute = `/collection/all` as const;

export const mylistRoute = (mylistId: number) => {
  return `/collection/mylist/${mylistId}` as const;
};

const editKey = "edit" as const;
const editItemsValue = "items" as const;

export const mylistItemsEditRoute = (mylistId: number) => {
  const path = mylistRoute(mylistId);
  const searchParams = new URLSearchParams({ [editKey]: editItemsValue });
  return `${path}?${searchParams.toString()}` as const;
};

export const isMylistItemsEditRoute = (searchParams: URLSearchParams) => {
  return searchParams.get(editKey) === editItemsValue;
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
