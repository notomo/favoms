import { Outlet, json, redirect, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { createMylist, listMylists } from "~/persist/mylist";
import { allItemsRoute, collectionRoute, mylistRoute } from "~/route_path";
import { CollectionLink, CollectionRow } from "./collection";
import { CreateMylistDialog } from "./create_mylist_dialog";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/component/ui/dropdown-menu";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute) {
    return redirect(allItemsRoute);
  }

  const mylists = await listMylists();
  return json({
    mylists,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const mylistName = formData.get("name")?.toString();
  const mylist = await createMylist(mylistName!);
  return redirect(mylistRoute(mylist.id));
};

const CollectionsDropDownMenu = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <DropdownMenu open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-gray-600">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <CreateMylistDialog onCreated={() => setIsOpened(false)} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Collections = () => {
  const { mylists } = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-end h-[40px]">
        <CollectionsDropDownMenu />
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
