import { Await, AwaitProps } from "@remix-run/react";
import { Suspense } from "react";
import { Loading } from "~/component/ui/loading";

export const LazyLoad = <Resolve,>(props: AwaitProps<Resolve>) => {
  return (
    <Suspense fallback={<Loading />}>
      <Await {...props} />
    </Suspense>
  );
};
