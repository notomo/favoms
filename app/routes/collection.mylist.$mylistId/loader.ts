import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { getMylist } from "~/.server/persist/mylist";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = validateId(params.mylistId);
  const mylist = getMylist(mylistId).then((x) => {
    assertNotFound(x, "mylist is not found");
    return x;
  });
  return defer({
    mylist,
  });
};

export type Mylist = {
  id: number;
  name: string;
  items: MylistItem[];
};

export type MylistItem = {
  id: number;
  name: string;
};
