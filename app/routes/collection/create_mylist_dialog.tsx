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

export const CreateMylistDialog = ({
  onCreated,
}: {
  onCreated: () => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Dialog open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
      <DialogTrigger className="flex items-start w-full">New</DialogTrigger>
      <DialogContent>
        <Form
          method="post"
          onSubmit={() => {
            setIsOpened(false);
            onCreated();
          }}
          className="flex flex-col gap-4"
        >
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>New mylist</DialogTitle>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                type="text"
                defaultValue="New"
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
