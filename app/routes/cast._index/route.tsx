import { TwoColumn } from "~/component/layout/twoColumn";

export { loader } from "~/routes/cast/loader";

export default function Page() {
  return (
    <TwoColumn>
      <div className="h-full w-full border"></div>
      <div className="h-full w-full border"></div>
    </TwoColumn>
  );
}
