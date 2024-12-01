import { Suspense } from "react";
import { Await, type AwaitProps } from "react-router";
import { Loading } from "~/component/ui/loading";

export const LazyLoad = <Resolve,>(props: AwaitProps<Resolve>) => {
  return (
    <Suspense fallback={<Loading />}>
      <Await {...props} />
    </Suspense>
  );
};
