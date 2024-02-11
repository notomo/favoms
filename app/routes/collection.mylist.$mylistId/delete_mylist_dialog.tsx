import { Form } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/component/ui/dialog";

export const DeleteMylistDialog = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
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
