import { TwoColumn } from "~/component/layout/twoColumn";
import { type MetaFunction } from "@remix-run/node";

export { loader } from "~/routes/book.author/loader";

export const meta: MetaFunction = () => {
  return [{ title: "Book Author | favoms" }];
};

export default function Page() {
  return (
    <TwoColumn>
      <div className="h-full w-full border"></div>
      <div className="h-full w-full border"></div>
    </TwoColumn>
  );
}
