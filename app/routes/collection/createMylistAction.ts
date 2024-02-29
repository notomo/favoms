import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { createMylist } from "~/.server/persist/mylist";
import { mylistRoute } from "~/routePath";
import { createMylistSchema } from "~/routes/collection/schema";

export const createMylistAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: createMylistSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const mylistName = submission.value.name;
  const mylist = await createMylist(mylistName);
  return redirect(mylistRoute(mylist.id));
};

export type ActionData = ReturnType<
  typeof useActionData<typeof createMylistAction>
>;
