import { useSearchParams } from "react-router";
import { castRoute } from "~/routePath/castRoute";
import { ItemLink } from "~/routes/collection.all/rowLink";
import type { Video } from "./loader";

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
