import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { type useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { prisma } from "~/lib/prisma";
import { createMylistSchema } from "./schema";
import { mylistRoute } from "~/routePath/mylistRoute";

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
  return redirect(mylistRoute({ pathParams: { mylistId: mylist.id } }));
};

export type ActionData = ReturnType<
  typeof useActionData<typeof createMylistAction>
>;

async function createMylist(name: string) {
  return await prisma.$transaction(async (tx) => {
    const mylist = await tx.mylist.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    await tx.mylistOrder.create({
      data: {
        mylist: {
          connect: mylist,
        },
      },
    });
    return mylist;
  });
}
