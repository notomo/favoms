const collectionPath = "collection" as const;
const itemPath = `item` as const;
const collectionMylistPath = `${collectionPath}/mylist` as const;
const managePath = `manage` as const;
const manageImportPath = `${managePath}/import` as const;
const bookPath = `book` as const;
const bookAuthorListPath = `${bookPath}/author` as const;
const castListPath = `cast` as const;

const editKey = "edit" as const;
const editItemsValue = "items" as const;

const pageKey = "page" as const;

export const getPage = (searchParams: URLSearchParams): number => {
  const page = searchParams.get(pageKey);
  if (page) {
    return Math.max(1, Number(page));
  }
  return 1;
};

const queryKey = "query";
export const getQuery = (searchParams: URLSearchParams): string => {
  return searchParams.get(queryKey) || "";
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

export const itemRoute = (itemId: number) => {
  return `/${itemPath}/${itemId}` as const;
};

export const importRoute = (importHistoryId?: number) => {
  if (importHistoryId) {
    return `/${manageImportPath}/history/${importHistoryId}` as const;
  }
  return `/${manageImportPath}` as const;
};

export const importHistoryRoute = (importHistoryId: number) => {
  return importRoute(importHistoryId);
};

export const bookAuthorListRoute = () => {
  return `/${bookAuthorListPath}` as const;
};

export const bookAuthorRoute = (
  bookAuthorId: number,
  page: number,
  query: string,
) => {
  const route = `${bookAuthorListRoute()}/${bookAuthorId}` as const;
  return build(route, {
    [pageKey]: page.toString(),
    [queryKey]: query,
  });
};

export const bookAuthorBookRoute = (
  bookAuthorId: number,
  itemId: number,
  page: number,
  query: string,
) => {
  const route = `${bookAuthorListRoute()}/${bookAuthorId}/x/${itemId}` as const;
  return build(route, {
    [pageKey]: page.toString(),
    [queryKey]: query,
  });
};

export const castListRoute = () => {
  return `/${castListPath}` as const;
};

export const castRoute = (castId: number, page: number, query: string) => {
  const route = `${castListRoute()}/${castId}` as const;
  return build(route, {
    [pageKey]: page.toString(),
    [queryKey]: query,
  });
};

export const castVideoRoute = (
  castId: number,
  itemId: number,
  page: number,
  query: string,
) => {
  const route = `${castListRoute()}/${castId}/x/${itemId}` as const;
  return build(route, {
    [pageKey]: page.toString(),
    [queryKey]: query,
  });
};

const build = <T extends string>(route: T, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return `${route}?${searchParams.toString()}` as const;
};
