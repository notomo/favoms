import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMylistWith } from "~/persist/mylist";

export const getMylistWithItems = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = +params.mylistId!;
  const mylist = await getMylistWith(mylistId, { items: true });
  if (mylist === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json({
    mylistId: mylist.id,
    mylistName: mylist.name,
    items: mylist.items,
  });
};

export type LoaderData = ReturnType<
  typeof useLoaderData<typeof getMylistWithItems>
>;
