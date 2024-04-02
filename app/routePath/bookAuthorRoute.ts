import { buildRoute, mergeParams } from "~/routePath/builder";

type QueryParams = Readonly<{
  query?: string;
  page?: number;
}>;

type PathParams = Readonly<{
  bookAuthorId?: number;
  itemId?: number;
}>;

export const bookAuthorRoute = ({
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

  if (params?.bookAuthorId !== undefined && params?.itemId !== undefined) {
    const route =
      `/book/author/${params.bookAuthorId}/x/${params.itemId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  if (params?.bookAuthorId !== undefined) {
    const route = `/book/author/${params.bookAuthorId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  const route = `/book/author` as const;
  return buildRoute(route, queryParams, searchParams);
};
