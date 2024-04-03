import { buildRoute, mergeParams } from "~/routePath/builder";

const dialogKey = "dialog" as const;
const newDialog = "new" as const;
export type CollectionDialogType = typeof newDialog | undefined;

const editKey = "edit" as const;
const editMylistsValue = "mylists" as const;

type QueryParams = Readonly<{
  query?: string;
  page?: number;
  [dialogKey]?: CollectionDialogType;
  [editKey]?: typeof editMylistsValue;
}>;

type PathParams = Readonly<{
  mylistId?: number;
  itemId?: number;
}>;

export const collectionRoute = ({
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

  if (params?.mylistId !== undefined && params?.itemId !== undefined) {
    const route =
      `/collection/mylist/${params.mylistId}/item/${params.itemId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  if (params?.mylistId !== undefined) {
    const route = `/collection/mylist/${params.mylistId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  if (params?.itemId !== undefined) {
    const route = `/collection/all/item/${params.itemId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  const route = `/collection/all` as const;
  return buildRoute(route, queryParams, searchParams);
};

export const isMylistsEditRoute = (searchParams: URLSearchParams) => {
  return searchParams.get(editKey) === editMylistsValue;
};

export const getCollectionDialogType = (
  searchParams: URLSearchParams,
): CollectionDialogType => {
  const dialogType = searchParams.get(dialogKey);
  if (dialogType === newDialog) {
    return newDialog;
  }
  return undefined;
};

export const removeCollectionParam = (
  s: string,
  key: typeof dialogKey | typeof editKey,
) => {
  const searchParams = new URLSearchParams(s);
  searchParams.delete(key);
  return searchParams;
};
