import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { updateMylist } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";
import { mylistRoute } from "~/route_path";
import { editMylistInfoSchema } from "~/routes/collection.mylist.$mylistId/schema";

export const editMylistInfoAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const mylistId = validateId(params.mylistId);

  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: editMylistInfoSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const name = submission.value.name;
  const mylist = await updateMylist(mylistId, { name });
  return redirect(mylistRoute(mylist.id));
};

export type EditMylistInfoActionData = ReturnType<
  typeof useActionData<typeof editMylistInfoAction>
>;
