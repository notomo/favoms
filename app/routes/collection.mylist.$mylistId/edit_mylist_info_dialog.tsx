import { Label } from "~/component/ui/label";
import { Form } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";
import { useState } from "react";

export const EditMylistInfoDialog = ({
  mylistName,
  onEdited,
}: {
  mylistName: string;
  onEdited: () => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Dialog open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
      <DialogTrigger className="flex items-start w-full">
        Edit info
      </DialogTrigger>
      <DialogContent>
        <Form
          method="post"
          action="edit_name"
          onSubmit={() => {
            setIsOpened(false);
            onEdited();
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
