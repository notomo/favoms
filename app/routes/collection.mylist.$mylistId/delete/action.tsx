import { type ActionFunctionArgs, redirect } from "react-router";
import { prisma } from "~/lib/prisma";
import { validateId } from "~/lib/schema/validation/params";
import { collectionRoute } from "~/routePath/collectionRoute";

export const deleteMylistAction = async ({ params }: ActionFunctionArgs) => {
  const mylistId = validateId(params["mylistId"]);
  await deleteMylist(mylistId);
  throw redirect(collectionRoute({}));
};

async function deleteMylist(id: number) {
  return await prisma.mylist.delete({
    where: { id: id },
  });
}
