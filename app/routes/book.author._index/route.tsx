import type { MetaFunction } from "@remix-run/node";
import { TwoColumn } from "~/component/layout/twoColumn";

export { loader } from "~/routes/book.author/loader";

export const meta: MetaFunction = () => {
  return [{ title: "Book Author | favoms" }];
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
