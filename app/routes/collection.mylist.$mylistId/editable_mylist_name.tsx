import { Form } from "@remix-run/react";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/component/ui/button";
import { Input } from "~/component/ui/input";

export const EditableMylistName = ({
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
