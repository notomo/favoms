import { useEffect, useRef } from "react";
import { Loading } from "~/component/ui/loading";
import { ScrollArea } from "~/component/ui/scrollArea";

const LoadingItem = ({ load }: { load: () => void }) => {
  const loadingWrapper = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
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
  }, [loadingWrapper, load]);

  return (
    <div ref={loadingWrapper}>
      <Loading />
    </div>
  );
};

export const InfiniteScrollArea = ({
  className,
  hasNext,
  loadNext,
  children,
}: React.PropsWithChildren<{
  className?: string;
  hasNext: boolean;
  loadNext: () => void;
}>) => {
  return (
    <ScrollArea className={className}>
      {children}
      {hasNext ? <LoadingItem load={loadNext} /> : null}
    </ScrollArea>
  );
};
