import { castVideoRoute } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/rowLink";
import { Video } from "./loader";

export const CastVideoLinks = ({
  castId,
  videos,
  page,
  query,
}: {
  castId: number;
  videos: Video[];
  page: number;
  query: string;
}) => {
  return videos.map(({ itemId, title }) => {
    const path = castVideoRoute(castId, itemId, page, query);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};
