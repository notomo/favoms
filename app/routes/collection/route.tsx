import { Form, Outlet, json, redirect, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { createMylist, listMylists } from "~/persist/mylist";
import { allItemsRoute, mylistRoute } from "~/route_path";
import { CollectionLink, CollectionRow } from "./collection";
import { Button } from "~/component/ui/button";
import { Plus } from "lucide-react";

export const loader = async () => {
  const mylists = await listMylists();
  return json({
    mylists,
  });
};

export const action = async () => {
  const mylist = await createMylist();
  return redirect(mylistRoute(mylist.id));
};

const CreateMylistButton = () => {
  return (
    <Form method="post">
      <Button type="submit" variant="secondary">
        <Plus className="h-4 w-4" />
      </Button>
    </Form>
  );
};

const Collections = () => {
  const { mylists } = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-start h-[40px]">
        <CreateMylistButton />
      </div>
      <ScrollArea className="border border-gray-600 h-[calc(100%-40px)]">
        <nav className="h-full">
          <ul className="flex flex-col h-full">
            <CollectionLink path={allItemsRoute}>
              <CollectionRow>All</CollectionRow>
            </CollectionLink>

            {mylists.map(({ id, name }) => {
              return (
                <CollectionLink path={mylistRoute(id)} key={id}>
                  <CollectionRow>{name}</CollectionRow>
                </CollectionLink>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex gap-4 w-full h-full p-4">
      <div className="w-2/12 h-full">
        <Collections />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
