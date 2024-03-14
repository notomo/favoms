import { useNavigation } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageRange } from "~/component/ui/infiniteScrollArea/pageRange";
import { Loading } from "~/component/ui/loading";
import { ScrollArea } from "~/component/ui/scrollArea";

const LoadingItem = ({ has, load }: { has: boolean; load: () => void }) => {
  const loadingWrapper = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return;
        }
        if (!has) {
          return;
        }
        observer.disconnect();
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
  }, [loadingWrapper, load, has]);

  return <div ref={loadingWrapper}>{has ? <Loading /> : null}</div>;
};

export const InfiniteScrollArea = <T extends { id: number }>({
  className,
  existsNextPage,
  allItems,
  setAllItems,
  addedItems,
  page,
  pageKey,
  setSearchParams,
  content,
}: React.PropsWithChildren<{
  className?: string;
  allItems: T[];
  setAllItems: (items: T[]) => void;
  addedItems: T[];
  page: number;
  pageKey: string;
  setSearchParams: (params: Record<string, string>) => void;
  existsNextPage: boolean;
  content: (items: T[]) => React.ReactNode;
}>) => {
  const [loadedPages, setLoadedPages] = useState(PageRange.create());
  const currentItems = useMemo(
    () => [
      ...(PageRange.isLower(loadedPages, page) ? addedItems : []),
      ...allItems,
      ...(PageRange.isUpper(loadedPages, page) ? addedItems : []),
    ],
    [addedItems, allItems, loadedPages, page],
  );

  const loadNext = useCallback(() => {
    if (PageRange.contains(loadedPages, page)) {
      return;
    }
    setAllItems(currentItems);
    setLoadedPages(PageRange.load(loadedPages, page));
    const nextPage = page + 1;
    setSearchParams({ [pageKey]: nextPage.toString() });
  }, [currentItems, loadedPages, page, pageKey, setAllItems, setSearchParams]);

  const loadPrevious = useCallback(() => {
    if (PageRange.contains(loadedPages, page)) {
      return;
    }
    setAllItems(currentItems);
    setLoadedPages(PageRange.load(loadedPages, page));
    const previousPage = page - 1;
    setSearchParams({ [pageKey]: previousPage.toString() });
  }, [currentItems, loadedPages, page, pageKey, setAllItems, setSearchParams]);

  const navigation = useNavigation();
  const hasNext =
    navigation.state === "idle" &&
    existsNextPage &&
    !PageRange.contains(loadedPages, page + 1);
  const hasPrevious =
    navigation.state === "idle" &&
    page > 1 &&
    !PageRange.contains(loadedPages, page - 1);

  return (
    <ScrollArea className={className}>
      <LoadingItem load={loadPrevious} has={hasPrevious} />
      {content(currentItems)}
      <LoadingItem load={loadNext} has={hasNext} />
    </ScrollArea>
  );
};
