import { Form } from "@remix-run/react";
import { useState } from "react";
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

export const DeleteMylistDialog = ({
  onDeleted,
}: {
  onDeleted: () => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Dialog open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
      <DialogTrigger className="flex items-start w-full">Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the mylist?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Form
            method="delete"
            action="destroy"
            onSubmit={() => {
              setIsOpened(false);
              onDeleted();
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
