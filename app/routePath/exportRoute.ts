import { buildRoute } from "~/routePath/builder";

type QueryParams = Readonly<Record<string, string>>;

export const exportRoute = ({
  queryParams,
  searchParams,
}: {
  queryParams?: QueryParams;
  searchParams?: URLSearchParams;
}) => {
  const route = `/manage/export` as const;
  return buildRoute(route, queryParams, searchParams);
};

export const exportFileRoute = ({
  queryParams,
  searchParams,
}: {
  queryParams?: QueryParams;
  searchParams?: URLSearchParams;
}) => {
  const route = `/manage/export/file` as const;
  return buildRoute(route, queryParams, searchParams);
};
