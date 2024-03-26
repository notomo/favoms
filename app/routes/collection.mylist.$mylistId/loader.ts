import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { getMylist } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = validateId(params.mylistId);
  const mylist = getMylist(mylistId);
  return defer({
    mylist,
  });
};

export type MylistItem = {
  id: number;
  name: string;
};
