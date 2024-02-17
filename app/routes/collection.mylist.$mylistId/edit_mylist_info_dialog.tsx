import { Label } from "~/component/ui/label";
import { Form } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";

export const EditMylistInfoDialog = ({
  mylistName,
}: {
  mylistName: string;
}) => {
  return (
    <Form method="post" action="edit_name" className="flex flex-col gap-4">
      <DialogHeader className="flex flex-col gap-2">
        <DialogTitle>Edit mylist info</DialogTitle>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            type="text"
            defaultValue={mylistName}
          />
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </Form>
  );
};
