import type { MetaFunction } from "@remix-run/node";
import { useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { Outlet, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { ActionData, runImportAction } from "./run/action";
import { schema } from "./run/schema";
import { BooleanInput, FileInput, SubmitButton } from "./input";
import { ContentErrorMessage } from "~/routes/manage.import/contentErrorMessage";
import { loader } from "./loader";
import { LazyLoad } from "~/component/lazyLoad";
import { ImportHistoryList } from "~/routes/manage.import/historyList";

export const meta: MetaFunction = () => {
  return [{ title: "Import | favoms" }];
};

export const action = runImportAction;

export { loader } from "./loader";

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

  const loaderData = useLoaderData<typeof loader>();

  const params = useParams();
  const targetHistoryId = params["importHistoryId"];
  const enabledHistory = targetHistoryId !== undefined;
  const targetKind = enabledHistory ? "history" : "file";

  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4 py-8">
      <div className="flex flex-col gap-4 p-4">
        <fetcher.Form
          method="post"
          id={form.id}
          onSubmit={form.onSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          <SubmitButton isSubmitting={isSubmitting}>Import</SubmitButton>

          <FileInput
            key={targetHistoryId}
            disabled={enabledHistory}
            field={fields.targetFile}
          >
            File
          </FileInput>

          <input name={fields.targetKind.name} value={targetKind} hidden />
          <input
            name={fields.targetHistoryId.name}
            value={targetHistoryId}
            hidden
          />

          <BooleanInput field={fields.dryRun}>Dry run</BooleanInput>

          <BooleanInput field={fields.isReplace}>Replace</BooleanInput>
        </fetcher.Form>

        <div className="grid h-full grid-cols-[100%] grid-rows-[10%_90%]">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">History</p>
            <Outlet />
          </div>

          <LazyLoad resolve={loaderData.histories}>
            {(histories) => <ImportHistoryList histories={histories} />}
          </LazyLoad>
        </div>
      </div>

      <ContentErrorMessage error={contentError} />
    </div>
  );
}
