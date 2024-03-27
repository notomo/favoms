import { type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { Cast, loader } from "./loader";
import { CastLinks } from "./castLinks";
import { getPage, getQuery } from "~/routePath";
import { LazyLoad } from "~/component/lazyLoad";

export const meta: MetaFunction = ({ params }) => {
  const castId = params.castId || "(invalid)";
  return [{ title: `Cast ${castId} | favoms` }];
};

export { loader } from "./loader";

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
      <LazyLoad resolve={loaderData.cast}>
        {(cast) => <CastVideoList cast={cast} />}
      </LazyLoad>
      <Outlet />
    </div>
  );
}
