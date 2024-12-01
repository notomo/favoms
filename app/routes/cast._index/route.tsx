import type { MetaFunction } from "react-router";
import { TwoColumn } from "~/component/layout/twoColumn";

export { loader } from "~/routes/cast/loader";

export const meta: MetaFunction = () => {
  return [{ title: "Cast | favoms" }];
};

export default function Page() {
  return (
    <TwoColumn>
      <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
        <div />
        <div className="h-full w-full border" />
      </div>
      <div className="h-full w-full border" />
    </TwoColumn>
  );
}
