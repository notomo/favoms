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
