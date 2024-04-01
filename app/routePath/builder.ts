const toStringParams = (
  queryParams?: Record<string, string | number | boolean>,
  searchParams?: URLSearchParams,
) => {
  const params = {
    ...Object.fromEntries(searchParams?.entries() || []),
    ...(queryParams || {}),
  };
  return Object.fromEntries(
    Object.entries(params).map(([k, v]) => {
      return [k, v?.toString()];
    }),
  ) as Record<string, string>;
};

export const buildRoute = <
  Route extends string,
  QueryParams extends Record<string, string | number | boolean>,
>(
  route: Route,
  queryParams?: QueryParams,
  searchParams?: URLSearchParams,
) => {
  const stringParams = toStringParams(queryParams, searchParams);
  const params = Object.fromEntries(
    Object.entries(stringParams).filter(([, v]) => v),
  ) as Record<string, string>;
  return `${route}?${new URLSearchParams(params).toString()}` as const;
};
