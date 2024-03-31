import { castVideoRoute, getPage, getQuery } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/rowLink";
import { Video } from "./loader";
import { useSearchParams } from "@remix-run/react";

export const CastsVideoLinks = ({
  castId,
  videos,
}: {
  castId: number;
  videos: Video[];
}) => {
  const [searchParams] = useSearchParams();
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  return videos.map(({ itemId, title }) => {
    const path = castVideoRoute(castId, itemId, page, query);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};
