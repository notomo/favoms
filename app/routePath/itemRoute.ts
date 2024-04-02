import { buildRoute, mergeParams } from "~/routePath/builder";

type QueryParams = Readonly<Record<string, string>>;

type PathParams = Readonly<{
  itemId: number;
}>;

export const itemRoute = ({
  pathParams,
  queryParams,
  rawPathParams,
  searchParams,
}: {
  pathParams: PathParams;
  queryParams?: QueryParams;
  rawPathParams?: Record<string, string | undefined>;
  searchParams?: URLSearchParams;
}) => {
  const params = mergeParams({ rawPathParams, pathParams });

  const route = `/item/${params.itemId}` as const;
  return buildRoute(route, queryParams, searchParams);
};
