import { mylistRoute } from "~/route_path";
import { CollectionLink } from "./collection_link";
import { LoaderData } from "./loader";

export const MylistLinks = ({
  mylists,
}: {
  mylists: LoaderData["mylists"];
}) => {
  return mylists.map(({ id, name }) => {
    const path = mylistRoute(id);
    return (
      <CollectionLink path={path} key={id}>
        {name}
      </CollectionLink>
    );
  });
};
