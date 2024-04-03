import { buildRoute, mergeParams } from "~/routePath/builder";

const dialogKey = "dialog" as const;
const editDialog = "edit" as const;
const deleteDialog = "delete" as const;
export type MylistDialogType =
  | typeof editDialog
  | typeof deleteDialog
  | undefined;

export const getMylistDialogType = (
  searchParams: URLSearchParams,
): MylistDialogType => {
  const dialogType = searchParams.get(dialogKey);
  if (dialogType === editDialog) {
    return editDialog;
  }
  if (dialogType === deleteDialog) {
    return deleteDialog;
  }
  return undefined;
};

const editKey = "edit" as const;
const editItemsValue = "items" as const;

type QueryParams = Readonly<{
  query?: string;
  page?: number;
  [dialogKey]?: MylistDialogType;
  [editKey]?: typeof editItemsValue;
}>;

type PathParams = Readonly<{
  mylistId: number;
  itemId?: number;
}>;

export const mylistRoute = ({
  pathParams,
  queryParams,
  rawPathParams,
  searchParams,
}: {
  pathParams?: PathParams;
  queryParams?: QueryParams;
  rawPathParams?: Record<string, string | undefined>;
  searchParams?: URLSearchParams;
}) => {
  const params = mergeParams({ rawPathParams, pathParams });

  if (params?.itemId !== undefined) {
    const route =
      `/collection/mylist/${params.mylistId}/item/${params.itemId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  const route = `/collection/mylist/${params.mylistId}` as const;
  return buildRoute(route, queryParams, searchParams);
};

export const isMylistItemsEditRoute = (searchParams: URLSearchParams) => {
  return searchParams.get(editKey) === editItemsValue;
};

export const removeMylistParam = (
  s: string,
  key: typeof dialogKey | typeof editKey,
) => {
  const searchParams = new URLSearchParams(s);
  searchParams.delete(key);
  return searchParams;
};
