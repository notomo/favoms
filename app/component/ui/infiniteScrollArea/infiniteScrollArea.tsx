import { useNavigation, useSearchParams } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageRange } from "~/component/ui/infiniteScrollArea/pageRange";
import { Loading } from "~/component/ui/loading";
import { ScrollArea } from "~/component/ui/scrollArea";

const LoadingItem = ({
  canLoad,
  load,
}: {
  canLoad: boolean;
  load: () => void;
}) => {
  const loadingWrapper = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return;
        }
        if (!canLoad) {
          return;
        }
        load();
      },
      {
        threshold: 0.0,
      },
    );

    const current = loadingWrapper.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (!current) {
        return;
      }
      observer.unobserve(current);
    };
  }, [loadingWrapper, load, canLoad]);

  return <div ref={loadingWrapper}>{canLoad ? <Loading /> : null}</div>;
};

export const InfiniteScrollArea = <T,>({
  className,
  page,
  pageKey,
  existsNextPage,
  addedItems,
  content,
}: React.PropsWithChildren<{
  className?: string;
  page: number;
  pageKey: string;
  addedItems: T[];
  existsNextPage: boolean;
  content: (items: T[]) => React.ReactNode;
}>) => {
  const [loadedPages, setLoadedPages] = useState(PageRange.create(page));
  const [allItems, setAllItems] = useState<T[]>(addedItems);
  const [, setSearchParams] = useSearchParams();

  const currentItems = useMemo(
    () => [
      ...(PageRange.isLower(loadedPages, page) ? addedItems : []),
      ...allItems,
      ...(PageRange.isUpper(loadedPages, page) ? addedItems : []),
    ],
    [addedItems, allItems, loadedPages, page],
  );

  const nextPage = page + 1;
  const loadNext = useCallback(() => {
    if (PageRange.contains(loadedPages, nextPage)) {
      return;
    }
    setLoadedPages(PageRange.load(loadedPages, page));

    setAllItems(currentItems);
    setSearchParams({ [pageKey]: nextPage.toString() });
  }, [loadedPages, page, nextPage, currentItems, setSearchParams, pageKey]);

  const previousPage = page - 1;
  const loadPrevious = useCallback(() => {
    if (PageRange.contains(loadedPages, previousPage)) {
      return;
    }
    setLoadedPages(PageRange.load(loadedPages, page));

    setAllItems(currentItems);
    setSearchParams({ [pageKey]: previousPage.toString() });
  }, [loadedPages, page, previousPage, currentItems, setSearchParams, pageKey]);

  const isIdle = useNavigation().state === "idle";
  const hasNext =
    isIdle && existsNextPage && !PageRange.contains(loadedPages, nextPage);
  const hasPrevious =
    isIdle && page > 1 && !PageRange.contains(loadedPages, previousPage);

  return (
    <ScrollArea className={className}>
      <LoadingItem load={loadPrevious} canLoad={hasPrevious} />
      {content(allItems)}
      <LoadingItem load={loadNext} canLoad={hasNext} />
    </ScrollArea>
  );
};
