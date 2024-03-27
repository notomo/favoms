import { type MetaFunction } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { collectionItemRoute } from "~/routePath";
import { ItemLink } from "./itemLink";
import { Button } from "~/component/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import { LoadingOr } from "~/component/ui/loading";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
import { loader } from "./loader";
import { Input } from "~/component/ui/input";
import { LazyLoad } from "~/component/lazyLoad";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export { loader } from "./loader";

type Item = {
  id: number;
  name: string;
};

const ItemRows = ({
  items,
  existsNextPage,
  page,
  query,
}: {
  items: Item[];
  existsNextPage: boolean;
  page: number;
  query: string;
}) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_6%_86%]">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <Form method="GET" className="flex items-center gap-2">
        <Input
          defaultValue={query}
          placeholder="Search item name"
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
        addedItems={items}
        existsNextPage={existsNextPage}
        content={(currentItems) => {
          return (
            <ul className="flex h-full flex-col">
              {currentItems.map(({ id, name }) => {
                const path = collectionItemRoute(id, page, query);
                return (
                  <ItemLink path={path} key={id}>
                    {name}
                  </ItemLink>
                );
              })}
            </ul>
          );
        }}
      />
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <LazyLoad resolve={loaderData.fetched}>
        {(fetched) => (
          <ItemRows
            page={loaderData.page}
            query={loaderData.query}
            {...fetched}
          />
        )}
      </LazyLoad>
      <Outlet />
    </div>
  );
}
