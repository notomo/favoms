import { Label } from "~/component/ui/label";
import { Form } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";

export const EditMylistInfoDialog = ({
  mylistName,
  isOpened,
  setIsOpened,
}: {
  mylistName: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
      <DialogContent>
        <Form
          method="post"
          action="edit_name"
          onSubmit={() => {
            setIsOpened(false);
          }}
          className="flex flex-col gap-4"
        >
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
      </DialogContent>
    </Dialog>
  );
};
