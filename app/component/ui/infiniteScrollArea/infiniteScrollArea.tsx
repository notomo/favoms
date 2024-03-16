import { useNavigation, useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
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
    const current = loadingWrapper.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return;
        }
        if (!canLoad) {
          return;
        }
        load();

        if (!current) {
          return;
        }
        observer.unobserve(current);
      },
      {
        threshold: 0.0,
      },
    );

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
  const [, setSearchParams] = useSearchParams();

  const [eachPageItems, setEachPageItems] = useState<Record<number, T[]>>({});
  const currentEachPageItems = {
    ...eachPageItems,
    [page]: addedItems,
  };
  const currentItems = Object.entries(currentEachPageItems)
    .map(([, x]) => x)
    .flat();

  const maxPage = Math.max(
    ...Object.entries(currentEachPageItems)
      .filter(([, items]) => items.length > 0)
      .map(([x]) => Number(x)),
  );
  const nextPage = maxPage + 1;
  const loadNext = () => {
    setEachPageItems({
      ...currentEachPageItems,
      [nextPage]: [],
    });
    setSearchParams({ [pageKey]: nextPage.toString() });
  };

  const minPage = Math.min(
    ...Object.entries(currentEachPageItems)
      .filter(([, items]) => items.length > 0)
      .map(([x]) => Number(x)),
  );
  const previousPage = Math.max(1, minPage - 1);
  const loadPrevious = () => {
    setEachPageItems({
      ...currentEachPageItems,
      [previousPage]: [],
    });
    setSearchParams({ [pageKey]: previousPage.toString() });
  };

  const isIdle = useNavigation().state === "idle";
  const hasNext =
    isIdle && existsNextPage && currentEachPageItems[nextPage] === undefined;
  const hasPrevious =
    isIdle && page > 1 && currentEachPageItems[previousPage] === undefined;

  return (
    <ScrollArea className={className}>
      <LoadingItem load={loadPrevious} canLoad={hasPrevious} />
      {content(currentItems)}
      <LoadingItem load={loadNext} canLoad={hasNext} />
    </ScrollArea>
  );
};
