import type { MetaFunction } from "@remix-run/node";
import { useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { Outlet, useFetcher } from "@remix-run/react";
import { ActionData, runImportAction } from "./action";
import { schema } from "./schema";
import { BooleanInput, FileInput, SubmitButton } from "./input";
import { ContentErrorMessage } from "~/routes/manage.import/contentErrorMessage";
import { ScrollArea } from "~/component/ui/scrollArea";
import { importHistoryRoute } from "~/routePath";
import { HistoryLink } from "~/routes/manage.import/rowLink";

export const meta: MetaFunction = () => {
  return [{ title: "Import | favoms" }];
};

export const action = runImportAction;

export default function Page() {
  const fetcher = useFetcher<ActionData>();

  const [form, fields] = useForm({
    lastResult: fetcher.data,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    shouldValidate: "onInput",
  });

  const isSubmitting = fetcher.state === "submitting";
  const contentError = fetcher.data?.error?.fileContent?.at(0);

  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4 py-8">
      <fetcher.Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4 p-4"
      >
        <SubmitButton isSubmitting={isSubmitting}>Import</SubmitButton>

        <FileInput field={fields.targetFile}>File</FileInput>

        <BooleanInput field={fields.dryRun}>Dry run</BooleanInput>

        <BooleanInput field={fields.isReplace}>Replace</BooleanInput>

        <div className="flex h-full flex-col gap-2">
          <div className="text-lg font-bold">History</div>
          <ScrollArea className="h-full border">
            <HistoryLink path={importHistoryRoute(1)}>test</HistoryLink>
            <HistoryLink path={importHistoryRoute(2)}>test</HistoryLink>
          </ScrollArea>
        </div>
      </fetcher.Form>

      <ContentErrorMessage error={contentError} />
      <Outlet />
    </div>
  );
}
