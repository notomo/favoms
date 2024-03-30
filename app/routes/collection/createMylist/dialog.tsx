import { Label } from "~/component/ui/label";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "~/component/ui/dialog";
import { Input } from "~/component/ui/input";
import { getInputProps, useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { createMylistSchema } from "./schema";
import { ActionData } from "./action";
import { ErrorMessage } from "~/component/ui/form";
import { LoadingOr } from "~/component/ui/loading";

export const CreateMylistDialog = () => {
  const fetcher = useFetcher<ActionData>();

  const [form, fields] = useForm({
    lastResult: fetcher.data,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: createMylistSchema });
    },
    shouldValidate: "onInput",
    defaultValue: {
      name: "New",
    },
  });

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form
      method="post"
      id={form.id}
      onSubmit={form.onSubmit}
      className="flex flex-col gap-4"
    >
      <DialogHeader>
        <DialogTitle>New mylist</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <Label htmlFor={fields.name.id}>Name</Label>
        <Input {...getInputProps(fields.name, { type: "text" })} />
        <ErrorMessage errors={fields.name.errors} />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          <LoadingOr isLoading={isSubmitting}>Save</LoadingOr>
        </Button>
      </DialogFooter>
    </fetcher.Form>
  );
};
