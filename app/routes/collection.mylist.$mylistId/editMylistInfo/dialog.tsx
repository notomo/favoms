import { Label } from "~/component/ui/label";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";
import { getInputProps, useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { editMylistInfoSchema } from "~/routes/collection.mylist.$mylistId/editMylistInfo/schema";
import { EditMylistInfoActionData } from "~/routes/collection.mylist.$mylistId/editMylistInfo/action";
import { ErrorMessage } from "~/component/ui/form";
import { LoadingOr } from "~/component/ui/loading";

export const EditMylistInfoDialog = ({
  mylistName,
}: {
  mylistName: string;
}) => {
  const fetcher = useFetcher<EditMylistInfoActionData>();

  const [form, fields] = useForm({
    lastResult: fetcher.data,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: editMylistInfoSchema });
    },
    shouldValidate: "onInput",
    defaultValue: {
      name: mylistName,
    },
  });

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form
      id={form.id}
      onSubmit={form.onSubmit}
      method="post"
      action="editName"
      className="flex flex-col gap-4"
    >
      <DialogHeader className="flex flex-col gap-2">
        <DialogTitle>Edit mylist info</DialogTitle>

        <div className="flex flex-col gap-2">
          <Label htmlFor={fields.name.id}>Name</Label>
          <Input {...getInputProps(fields.name, { type: "text" })} />
          <ErrorMessage errors={fields.name.errors} />
        </div>
      </DialogHeader>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          <LoadingOr isLoading={isSubmitting}>Save</LoadingOr>
        </Button>
      </DialogFooter>
    </fetcher.Form>
  );
};
