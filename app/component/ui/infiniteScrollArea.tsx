import { useEffect, useRef } from "react";
import { Loading } from "~/component/ui/loading";
import { ScrollArea } from "~/component/ui/scrollArea";

export const InfiniteScrollArea = ({
  hasMorePage,
  className,
  page,
  setPage,
  children,
}: React.PropsWithChildren<{
  hasMorePage: boolean;
  className?: string;
  page: number;
  setPage: (page: number) => void;
}>) => {
  const loadingWrapper = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return;
        }
        setPage(page + 1);
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
  }, [loadingWrapper, page, setPage]);

  return (
    <ScrollArea className={className}>
      {children}
      {hasMorePage ? (
        <div ref={loadingWrapper}>
          <Loading />
        </div>
      ) : null}
    </ScrollArea>
  );
};
