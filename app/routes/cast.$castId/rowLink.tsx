import { ItemLink } from "~/routes/collection.all/rowLink";
import { Video } from "./loader";
import { useSearchParams } from "@remix-run/react";
import { castRoute } from "~/routePath/castRoute";

export const CastsVideoLinks = ({
  castId,
  videos,
}: {
  castId: string;
  videos: Video[];
}) => {
  const [searchParams] = useSearchParams();

  return videos.map(({ itemId, title }) => {
    const path = castRoute({
      pathParams: {
        castId,
        itemId,
      },
      searchParams,
    });
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};
