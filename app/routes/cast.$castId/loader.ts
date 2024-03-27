import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { getCast } from "~/.server/persist/cast";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const castId = validateId(params.castId);
  const cast = getCast(castId).then((x) => {
    assertNotFound(x, "cast is not found");
    return x;
  });
  return defer({
    cast,
  });
};

export type Cast = {
  id: number;
  name: string;
  videos: Video[];
};

export type Video = {
  itemId: number;
  title: string;
};
