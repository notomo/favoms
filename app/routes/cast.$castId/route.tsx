import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { Cast, loader } from "./loader";
import { CastVideoLinks } from "./rowLink";
import { getPage, getQuery } from "~/routePath";
import { LazyLoad } from "~/component/lazyLoad";
import { TwoColumn } from "~/component/layout/twoColumn";
import { useForceTitle } from "~/lib/meta";

export { loader } from "./loader";

const CastVideoList = ({ cast }: { cast: Cast }) => {
  useForceTitle(`${cast.name} | favoms`);

  const [searchParams] = useSearchParams();
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  return (
    <ScrollArea className="border">
      <CastVideoLinks
        videos={cast.videos}
        castId={cast.id}
        page={page}
        query={query}
      />
    </ScrollArea>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <TwoColumn>
      <LazyLoad resolve={loaderData.cast}>
        {(cast) => <CastVideoList cast={cast} />}
      </LazyLoad>

      <Outlet />
    </TwoColumn>
  );
}
