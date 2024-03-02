import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMylistWith } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";

export const getMylistWithItems = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = validateId(params.mylistId);
  const mylist = getMylistWith(mylistId, { items: true });
  return defer({
    mylist,
  });
};

export type LoaderData = ReturnType<
  typeof useLoaderData<typeof getMylistWithItems>
>;
export type MylistItem = {
  id: number;
  name: string;
};