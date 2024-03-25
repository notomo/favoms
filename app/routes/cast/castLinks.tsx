import { castRoute } from "~/routePath";
import { CastLink } from "./castLink";
import { Cast } from "./loader";

export const CastLinks = ({
  casts,
  page,
  query,
}: {
  casts: Cast[];
  page: number;
  query: string;
}) => {
  return casts.map(({ id, name }) => {
    const path = castRoute(id, page, query);
    return (
      <CastLink path={path} key={id}>
        {name}
      </CastLink>
    );
  });
};
