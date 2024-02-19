import { mylistItemRoute } from "~/route_path";
import { ItemLink } from "~/routes/collection.all/item_link";
import { LoaderData } from "./loader";

export const ItemLinks = ({
  mylistId,
  items,
}: {
  mylistId: LoaderData["mylistId"];
  items: LoaderData["items"];
}) => {
  return items.map(({ id, name }) => {
    const path = mylistItemRoute(mylistId, id);
    return (
      <ItemLink path={path} key={id}>
        {name}
      </ItemLink>
    );
  });
};
