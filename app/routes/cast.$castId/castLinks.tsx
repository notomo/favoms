import { castVideoRoute } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/itemLink";
import { Video } from "./loader";

export const CastLinks = ({
  mylistId,
  videos,
  page,
  query,
}: {
  mylistId: number;
  videos: Video[];
  page: number;
  query: string;
}) => {
  return videos.map(({ itemId, title }) => {
    const path = castVideoRoute(mylistId, itemId, page, query);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};
