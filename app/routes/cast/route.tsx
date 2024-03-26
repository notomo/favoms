import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import { Loading, LoadingOr } from "~/component/ui/loading";
import { Cast, loader } from "./loader";
import { CastLinks } from "./castLinks";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
import { Input } from "~/component/ui/input";
import { Search } from "lucide-react";
import { Button } from "~/component/ui/button";

export const meta: MetaFunction = () => {
  return [{ title: "Casts | favoms" }];
};

export { loader } from "./loader";

const CastList = ({
  casts,
  existsNextPage,
  page,
  query,
}: {
  casts: Cast[];
  existsNextPage: boolean;
  page: number;
  query: string;
}) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[6%_94%] gap-y-1">
      <Form method="GET" className="flex items-center gap-2">
        <Input
          defaultValue={query}
          placeholder="Search cast name"
          name="query"
        />
        <Button type="submit" size="icon" variant="ghost" disabled={isLoading}>
          <LoadingOr isLoading={isLoading}>
            <Search size={24} />
          </LoadingOr>
        </Button>
      </Form>
      <InfiniteScrollArea
        key={query}
        className="border"
        page={page}
        pageKey="page"
        addedItems={casts}
        existsNextPage={existsNextPage}
        content={(casts) => {
          return (
            <nav className="h-full">
              <ul className="flex h-full flex-col">
                <CastLinks casts={casts} page={page} query={query} />
              </ul>
            </nav>
          );
        }}
      />
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.fetched}>
          {(fetched) => (
            <CastList
              casts={fetched.casts}
              existsNextPage={fetched.existsNextPage}
              page={loaderData.page}
              query={loaderData.query}
            />
          )}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}
