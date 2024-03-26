export { loader } from "~/routes/book.author/loader";

export default function Page() {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <div className="h-full w-full border"></div>
      <div className="h-full w-full border"></div>
    </div>
  );
}
