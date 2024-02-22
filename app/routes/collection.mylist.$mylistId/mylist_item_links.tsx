import { mylistItemRoute } from "~/route_path";
import { ItemLink } from "~/routes/collection.all/item_link";
import { MylistItem } from "./loader";

export const ItemLinks = ({
  mylistId,
  items,
}: {
  mylistId: number;
  items: MylistItem[];
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
