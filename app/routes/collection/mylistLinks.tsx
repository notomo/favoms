import { mylistRoute } from "~/routePath";
import { CollectionLink } from "./collectionLink";
import { Mylist } from "./loader";

export const MylistLinks = ({ mylists }: { mylists: Mylist[] }) => {
  return mylists.map(({ id, name }) => {
    const path = mylistRoute(id);
    return (
      <CollectionLink path={path} key={id}>
        {name}
      </CollectionLink>
    );
  });
};
