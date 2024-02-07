import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { Check, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";
import { ScrollArea } from "~/component/ui/scroll-area";
import { deleteMylist, getMylistWith } from "~/persist/mylist";
import { collectionRoute, mylistItemRoute } from "~/route_path";
import { ItemRow, ItemLink } from "~/routes/collection.all/item";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = +params.mylistId!;
  const mylist = await getMylistWith(mylistId, { items: true });
  if (mylist === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(mylist);
};

export const action = async ({ params }: ActionFunctionArgs) => {
  const mylistId = +params.mylistId!;
  await deleteMylist(mylistId);
  return redirect(collectionRoute);
};

const MylistDeleteDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the mylist?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Form method="post">
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditableMylistName = ({
  mylistId,
  name,
}: {
  mylistId: number;
  name: string;
}) => {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setEditable(false);
  }, [mylistId]);

  if (editable === false) {
    return (
      <div className="flex w-full items-center justify-between px-4 text-xl gap-2">
        {name}
        <Button variant="secondary" onClick={() => setEditable(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Form
      action="edit_name"
      method="post"
      className="flex w-full items-center justify-between px-4 text-xl gap-2"
      onSubmit={() => {
        setEditable(false);
      }}
    >
      <Input className="text-xl" type="text" name="name" defaultValue={name} />
      <Button variant="secondary" type="submit">
        <Check className="h-4 w-4" />
      </Button>
    </Form>
  );
};

const MylistItemRows = () => {
  const { id: mylistId, name, items } = useLoaderData<typeof loader>();

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between h-[40px]">
        <EditableMylistName mylistId={mylistId} name={name} />
        <MylistDeleteDialog />
      </div>
      <ScrollArea className="h-[calc(100%-40px)] border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id, name }) => {
            const path = mylistItemRoute(mylistId, id);
            return (
              <ItemLink path={path} key={id}>
                <ItemRow>{name}</ItemRow>
              </ItemLink>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex gap-4 w-full h-full">
      <div className="w-4/12">
        <MylistItemRows />
      </div>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}
