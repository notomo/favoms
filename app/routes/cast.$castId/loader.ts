import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { getCast } from "~/.server/persist/cast";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const castId = validateId(params.castId);
  const cast = getCast(castId);
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
