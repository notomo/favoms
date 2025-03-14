import { getInputProps, useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { useFetcher, useParams, useSearchParams } from "react-router";
import { Button } from "~/component/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "~/component/ui/dialog";
import { ErrorMessage } from "~/component/ui/form";
import { Input } from "~/component/ui/input";
import { Label } from "~/component/ui/label";
import { LoadingOr } from "~/component/ui/loading";
import type { EditMylistInfoActionData } from "./action";
import { editMylistInfoSchema } from "./schema";

export const EditMylistInfoDialog = ({
  mylistName,
}: {
  mylistName: string;
}) => {
  const fetcher = useFetcher<EditMylistInfoActionData>();
  const searchParams = useSearchParams();
  const rawPathParams = useParams();

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
      action="editInfo"
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

      <input
        name={fields.searchParams.name}
        value={searchParams.toString()}
        hidden
      />
      <input
        name={fields.itemId.name}
        value={rawPathParams["itemId"] || ""}
        hidden
      />

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          <LoadingOr isLoading={isSubmitting}>Save</LoadingOr>
        </Button>
      </DialogFooter>
    </fetcher.Form>
  );
};
