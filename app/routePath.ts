const collectionPath = "collection" as const;
const collectionAllPath = `${collectionPath}/all` as const;
const itemPath = `item` as const;
const collectionMylistPath = `${collectionPath}/mylist` as const;
const collectionAllItemPath = `${collectionAllPath}/item` as const;
const managePath = `manage` as const;
const manageImportPath = `${managePath}/import` as const;

export const homeRoute = () => {
  return "/" as const;
};

const editKey = "edit" as const;
const editItemsValue = "items" as const;
const editMylistsValue = "mylists" as const;

export const collectionRoute = () => {
  return `/${collectionPath}` as const;
};

export const mylistsEditRoute = () => {
  const route = allItemsRoute();
  return build(route, { [editKey]: editMylistsValue });
};

export const isMylistsEditRoute = (searchParams: URLSearchParams) => {
  return searchParams.get(editKey) === editMylistsValue;
};

const pageKey = "page" as const;

export const allItemsRoute = () => {
  return `/${collectionAllPath}` as const;
};

export const allItemsWithPageRoute = (page: number) => {
  const route = allItemsRoute();
  return build(route, { [pageKey]: page.toString() });
};

export const getPage = (searchParams: URLSearchParams): number => {
  const page = searchParams.get(pageKey);
  if (page) {
    return Number(page);
  }
  return 1;
};

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
  const route = mylistRoute(mylistId);
  return build(route, { [mylistDialogKey]: editDialog });
};

export const mylistDeleteRoute = (mylistId: number) => {
  const route = mylistRoute(mylistId);
  return build(route, { [mylistDialogKey]: deleteDialog });
};

export const mylistRoute = (mylistId: number) => {
  return `/${collectionMylistPath}/${mylistId}` as const;
};

export const mylistItemsEditRoute = (mylistId: number) => {
  const route = mylistRoute(mylistId);
  return build(route, { [editKey]: editItemsValue });
};

export const isMylistItemsEditRoute = (searchParams: URLSearchParams) => {
  return searchParams.get(editKey) === editItemsValue;
};

export const mylistItemRoute = (mylistId: number, itemId: number) => {
  return `${mylistRoute(mylistId)}/${itemPath}/${itemId}` as const;
};

export const collectionItemRoute = (itemId: number, page: number) => {
  const route = `/${collectionAllItemPath}/${itemId}` as const;
  return build(route, { [pageKey]: page.toString() });
};

export const itemRoute = (itemId: number) => {
  return `/${itemPath}/${itemId}` as const;
};

export const importRoute = () => {
  return `/${manageImportPath}` as const;
};

const build = <T extends string>(route: T, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return `${route}?${searchParams.toString()}` as const;
};