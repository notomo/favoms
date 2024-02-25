import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { reorderMylists } from "~/.server/persist/mylist";
import { collectionRoute } from "~/route_path";
import { editMylistsSchema } from "~/routes/collection/schema";

export const doneMylistsEditAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: editMylistsSchema,
  });
  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const mylistIds = submission.value.mylistIds;
  await reorderMylists(mylistIds);
  return redirect(collectionRoute);
};

export type DoneMylistsEditActionData = ReturnType<
  typeof useActionData<typeof doneMylistsEditAction>
>;
