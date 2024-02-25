export const homeRoute = "/" as const;

const editKey = "edit" as const;
const editItemsValue = "items" as const;
const editMylistsValue = "mylists" as const;

export const collectionRoute = "/collection" as const;

export const mylistsEditRoute = () => {
  const searchParams = new URLSearchParams({ [editKey]: editMylistsValue });
  return `${allItemsRoute}?${searchParams.toString()}` as const;
};

export const isMylistsEditRoute = (searchParams: URLSearchParams) => {
  return searchParams.get(editKey) === editMylistsValue;
};

export const allItemsRoute = `/collection/all` as const;

const mylistDialogKey = "dialog" as const;
const editDialog = "edit" as const;
const deleteDialog = "delete" as const;
export type DialogType = typeof editDialog | typeof deleteDialog | undefined;

export const getMylistDialogType = (
  searchParams: URLSearchParams,
): DialogType => {
  const dialogType = searchParams.get(mylistDialogKey);
  if (dialogType === editDialog) {
    return editDialog;
  }
  if (dialogType === deleteDialog) {
    return deleteDialog;
  }
  return undefined;
};

export const mylistInfoEditRoute = (mylistId: number) => {
  const path = mylistRoute(mylistId);
  const searchParams = new URLSearchParams({ [mylistDialogKey]: editDialog });
  return `${path}?${searchParams.toString()}` as const;
};

export const mylistDeleteRoute = (mylistId: number) => {
  const path = mylistRoute(mylistId);
  const searchParams = new URLSearchParams({ [mylistDialogKey]: deleteDialog });
  return `${path}?${searchParams.toString()}` as const;
};

export const mylistRoute = (mylistId: number) => {
  return `/collection/mylist/${mylistId}` as const;
};

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

export const importRoute = `/manage/import/`;
