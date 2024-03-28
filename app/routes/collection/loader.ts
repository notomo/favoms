import { LoaderFunctionArgs, defer, redirect } from "@remix-run/node";
import { prisma } from "~/lib/prisma";
import { allItemsRoute, collectionRoute } from "~/routePath";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute()) {
    return redirect(allItemsRoute());
  }

  const mylists = listMylists();

  return defer({
    mylists,
  });
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
