import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCast } from "~/.server/persist/cast";
import { validateId } from "~/lib/schema/validation/params";

export const getCastWithVideos = async ({ params }: LoaderFunctionArgs) => {
  const castId = validateId(params.castId);
  const cast = getCast(castId);
  return defer({
    cast,
  });
};

export type LoaderData = ReturnType<
  typeof useLoaderData<typeof getCastWithVideos>
>;

export type Cast = {
  id: number;
  name: string;
  videos: Video[];
};

export type Video = {
  itemId: number;
  title: string;
};
