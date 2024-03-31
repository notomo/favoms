import { useNavigation, useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Loading } from "~/component/ui/loading";
import { ScrollArea } from "~/component/ui/scrollArea";

const LoadingItem = ({
  canLoad,
  load,
  className,
}: {
  canLoad: boolean;
  load: () => void;
  className?: string;
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

  return (
    <div className={className} ref={loadingWrapper}>
      {canLoad ? <Loading /> : null}
    </div>
  );
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollAtLeastOnce, setScrollAtLeastOnce] = useState(false); // to prevent load all previous page automatically

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
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [pageKey]: nextPage.toString(),
    });
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
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [pageKey]: previousPage.toString(),
    });
    setScrollAtLeastOnce(false);
  };

  const isIdle = useNavigation().state === "idle";
  const hasNext =
    isIdle && existsNextPage && currentEachPageItems[nextPage] === undefined;
  const hasPrevious =
    isIdle && page > 1 && currentEachPageItems[previousPage] === undefined;

  const scrollHandler = scrollAtLeastOnce
    ? undefined
    : () => {
        if (!hasPrevious) {
          return;
        }
        setScrollAtLeastOnce(true);
      };

  return (
    <ScrollArea
      className={className}
      onScroll={scrollHandler}
      onWheel={scrollHandler}
    >
      <LoadingItem
        load={loadPrevious}
        canLoad={hasPrevious && scrollAtLeastOnce}
      />
      {content(currentItems)}
      <LoadingItem className="p-4" load={loadNext} canLoad={hasNext} />
    </ScrollArea>
  );
};
