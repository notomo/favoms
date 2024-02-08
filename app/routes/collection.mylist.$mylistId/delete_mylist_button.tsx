import { Form } from "@remix-run/react";
import { Trash } from "lucide-react";
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

export const DeleteMylistButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger disabled={disabled} asChild>
        <Button disabled={disabled} variant="secondary">
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
          <Form method="delete" action="destroy">
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
