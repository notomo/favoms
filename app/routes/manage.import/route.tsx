import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Button } from "~/component/ui/button";
import { Checkbox } from "~/component/ui/checkbox";
import { Input } from "~/component/ui/input";
import { Label } from "~/component/ui/label";
import { Textarea } from "~/component/ui/textarea";
import { useForm, getInputProps } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import {
  object,
  transform,
  string,
  optional,
  instance,
  mimeType,
} from "valibot";
import { useActionData } from "@remix-run/react";

const schema = object({
  targetFile: instance(File, [mimeType(["application/json"])]),
  dryRun: transform(optional(string(), ""), (x) => x === "on"),
  isReplace: transform(optional(string(), ""), (x) => x === "on"),
});

export const meta: MetaFunction = () => {
  return [{ title: "Import | favoms" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // TODO

  return null;
}

const ErrorMessage = ({ errors }: { errors: string[] | undefined }) => {
  if (errors === undefined) {
    return null;
  }
  return <div className="text-orange-200">{errors}</div>;
};

export default function Index() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className="flex h-full w-full items-start justify-start gap-4 p-4 py-8">
      <form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-8 p-4"
        encType="multipart/form-data"
      >
        <Button className="text-lg" type="submit" size="lg">
          Import
        </Button>

        <div className="flex flex-col gap-2">
          <Label className="text-lg" htmlFor={fields.targetFile.id}>
            File
          </Label>
          <Input
            {...getInputProps(fields.targetFile, { type: "file" })}
            accept=".json"
            // required
            className="bg-primary text-black"
          />
          <ErrorMessage errors={fields.targetFile.errors} />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id={fields.dryRun.id} name={fields.dryRun.name} />
          <Label className="text-lg" htmlFor={fields.dryRun.id}>
            Dry run
          </Label>
          <ErrorMessage errors={fields.dryRun.errors} />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id={fields.isReplace.id} name={fields.isReplace.name} />
          <Label className="text-lg" htmlFor={fields.isReplace.id}>
            Replace
          </Label>
          <ErrorMessage errors={fields.isReplace.errors} />
        </div>
      </form>

      <div className="flex h-full w-full flex-col gap-2 p-4">
        <Label className="text-xl" htmlFor="errorMessage">
          Error message
        </Label>
        <Textarea
          readOnly
          id="errorMessage"
          className="h-full w-full border border-gray-600"
        />
      </div>
    </div>
  );
}
