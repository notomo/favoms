import { type LoaderFunctionArgs, redirect } from "react-router";
import { prisma } from "~/lib/prisma";
import { collectionRoute } from "~/routePath/collectionRoute";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute({})) {
    throw redirect(collectionRoute({}));
  }

  const mylists = listMylists();

  return {
    mylists,
  };
};

export type Mylist = {
  id: number;
  name: string;
};

async function listMylists(): Promise<Mylist[]> {
  const mylistOrders = await prisma.mylistOrder.findMany({
    where: {},
    orderBy: { position: "asc" },
    select: {
      mylist: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return mylistOrders.map((e) => e.mylist);
}
