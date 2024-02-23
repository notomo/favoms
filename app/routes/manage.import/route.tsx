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
  array,
  safeParse,
  flatten,
  minLength,
  number,
  minValue,
} from "valibot";
import { json, redirect, useActionData, useFetcher } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { importRoute } from "~/route_path";
import { importItems } from "~/persist/item";

const schema = object({
  targetFile: instance(File, [mimeType(["application/json"])]),
  dryRun: transform(optional(string(), ""), (x) => x === "on"),
  isReplace: transform(optional(string(), ""), (x) => x === "on"),
});

const fileSchema = object({
  items: array(
    object({
      name: string([minLength(1)]),
      id: number([minValue(1)]),
    }),
  ),
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
    return json(submission.reply());
  }

  const fileContent = await submission.value.targetFile.text();
  const parsedJson = JSON.parse(fileContent);
  const validated = safeParse(fileSchema, parsedJson);
  if (!validated.success) {
    const error = JSON.stringify(flatten(validated.issues), null, 2);
    return json({
      ...submission.reply(),
      error: {
        ["fileContent"]: [error],
      },
    });
  }

  if (!submission.value.dryRun) {
    const upserts = validated.output.items.map((x) => ({
      where: { id: x.id },
      data: x,
    }));
    await importItems(upserts, submission.value.isReplace);
  }

  return redirect(importRoute);
}

const ErrorMessage = ({ errors }: { errors: string[] | undefined }) => {
  if (errors === undefined) {
    return null;
  }
  return <div className="text-orange-200">{errors}</div>;
};

export default function Index() {
  const fetcher = useFetcher<ReturnType<typeof useActionData<typeof action>>>();

  const [form, fields] = useForm({
    lastResult: fetcher.data,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    shouldValidate: "onSubmit",
  });

  const fileContentError = fetcher.data?.error?.fileContent?.at(0) || null;
  const fileContentErrorMessage =
    fileContentError !== null
      ? JSON.stringify(JSON.parse(fileContentError), null, 2)
      : "";

  return (
    <div className="flex h-full w-full items-start justify-start gap-4 p-4 py-8">
      <fetcher.Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="flex flex-col gap-8 p-4"
        encType="multipart/form-data"
      >
        <Button
          className="text-lg"
          type="submit"
          size="lg"
          disabled={fetcher.state !== "idle"}
        >
          {fetcher.state === "submitting" ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Import"
          )}
        </Button>

        <div className="flex flex-col gap-2">
          <Label className="text-lg" htmlFor={fields.targetFile.id}>
            File
          </Label>
          <Input
            {...getInputProps(fields.targetFile, { type: "file" })}
            accept=".json"
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
      </fetcher.Form>

      <div className="flex h-full w-full flex-col gap-2 p-4">
        <Label className="text-xl" htmlFor="errorMessage">
          Error message
        </Label>
        <Textarea
          readOnly
          id="errorMessage"
          className="h-full w-full border border-gray-600 text-xl"
          value={fileContentErrorMessage}
        />
      </div>
    </div>
  );
}
