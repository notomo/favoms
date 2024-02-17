import { Form } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/component/ui/dialog";

export const DeleteMylistDialog = () => {
  return (
    <Form method="delete" action="destroy">
      <DialogHeader>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the mylist?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" variant="destructive">
          Delete
        </Button>
      </DialogFooter>
    </Form>
  );
};
