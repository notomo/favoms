import { type MetaFunction } from "@remix-run/node";
import {
  Await,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { Suspense, useEffect } from "react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { Cast, getCastWithVideos } from "./loader";
import { CastLinks } from "./castLinks";
import { Loading } from "~/component/ui/loading";
import { getPage, getQuery } from "~/routePath";

export const meta: MetaFunction = ({ params }) => {
  const castId = params.castId || "(invalid)";
  return [{ title: `Cast ${castId} | favoms` }];
};

export const loader = getCastWithVideos;

const CastVideoList = ({ cast }: { cast: Cast }) => {
  useEffect(() => {
    // HACK
    document.title = `${cast.name} | favoms`;
  }, [cast.name]);

  const [searchParams] = useSearchParams();
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  return (
    <ScrollArea className="border">
      <ul className="flex h-full flex-col">
        <CastLinks
          videos={cast.videos}
          mylistId={cast.id}
          page={page}
          query={query}
        />
      </ul>
    </ScrollArea>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.cast}>
          {(cast) =>
            cast === null ? (
              <div>cast is not found</div>
            ) : (
              <CastVideoList cast={cast} />
            )
          }
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}
