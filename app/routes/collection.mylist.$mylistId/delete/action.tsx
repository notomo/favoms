import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { validateId } from "~/lib/schema/validation/params";
import { prisma } from "~/lib/prisma";
import { collectionRoute } from "~/routePath/collectionRoute";

export const deleteMylistAction = async ({ params }: ActionFunctionArgs) => {
  const mylistId = validateId(params.mylistId);
  await deleteMylist(mylistId);
  return redirect(collectionRoute({}));
};

async function deleteMylist(id: number) {
  return await prisma.mylist.delete({
    where: { id: id },
  });
}
