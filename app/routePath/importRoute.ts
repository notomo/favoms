import { buildRoute, mergeParams } from "~/routePath/builder";

type QueryParams = Readonly<Record<string, string>>;

type PathParams = Readonly<{
  importHistoryId?: number;
}>;

export const importRoute = ({
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

  if (params?.importHistoryId !== undefined) {
    const route = `/manage/import/history/${params.importHistoryId}` as const;
    return buildRoute(route, queryParams, searchParams);
  }

  const route = `/manage/import` as const;
  return buildRoute(route, queryParams, searchParams);
};
