import { buildRoute } from "~/routePath/builder";

type QueryParams = Readonly<{
  query?: string;
  page?: number;
  dialog?: "new";
  edit?: "mylist";
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
  const params = {
    ...rawPathParams,
    ...Object.fromEntries(
      Object.entries(pathParams || {}).map(([k, v]) => [k, v.toString()]),
    ),
  };

  if (params?.mylistId !== undefined && params?.itemId !== undefined) {
    const route =
      `/collection/mylist/${params.mylistId}/item/${params.itemId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  if (params?.mylistId !== undefined) {
    const route = `/collection/mylist/${params.mylistId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  const route = `/collection/all` as const;
  return buildRoute(route, queryParams, searchParams);
};
