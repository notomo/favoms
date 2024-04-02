import { getPage, getQuery } from "~/routePath/listParam";
import { ItemLink } from "~/routes/collection.all/rowLink";
import { Video } from "./loader";
import { useSearchParams } from "@remix-run/react";
import { castRoute } from "~/routePath/castRoute";

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
    const path = castRoute({
      queryParams: { query, page },
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
