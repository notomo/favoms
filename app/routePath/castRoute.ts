import { buildRoute, mergeParams } from "~/routePath/builder";

type QueryParams = Readonly<{
  query?: string;
  page?: number;
}>;

type PathParams = Readonly<{
  castId?: string;
  itemId?: string;
}>;

export const castRoute = ({
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

  if (params?.castId !== undefined && params?.itemId !== undefined) {
    const route = `/cast/${params.castId}/x/${params.itemId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  if (params?.castId !== undefined) {
    const route = `/cast/${params.castId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  const route = "/cast" as const;
  return buildRoute(route, queryParams, searchParams);
};
