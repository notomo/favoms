import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { Cast, type loader } from "./loader";
import { CastsVideoLinks } from "./rowLink";
import { LazyLoad } from "~/component/lazyLoad";
import { TwoColumn } from "~/component/layout/twoColumn";
import { useForceTitle } from "~/lib/meta";

export { loader } from "./loader";

const CastVideoList = ({ cast }: { cast: Cast }) => {
  useForceTitle(`${cast.name} | Cast | favoms`);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] items-center">
      <div className="px-4 text-2xl">{cast.name}</div>

      <div className="h-full">
        <ScrollArea className="h-full border">
          <CastsVideoLinks videos={cast.videos} castId={cast.id} />
        </ScrollArea>
      </div>
    </div>
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
