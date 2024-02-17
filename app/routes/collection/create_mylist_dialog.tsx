import { Label } from "~/component/ui/label";
import { Form } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { mylistRoute } from "~/route_path";
import { createMylist } from "~/persist/mylist";

export const createMylistAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const mylistName = formData.get("name")?.toString();
  const mylist = await createMylist(mylistName!);
  return redirect(mylistRoute(mylist.id));
};

export const CreateMylistDialog = () => {
  return (
    <Form method="post" className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>New mylist</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required type="text" defaultValue="New" />
      </div>

      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </Form>
  );
};
