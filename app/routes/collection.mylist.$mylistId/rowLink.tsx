import { mylistRoute } from "~/routePath/mylistRoute";
import { ItemLink } from "~/routes/collection.all/rowLink";
import type { MylistItem } from "./loader";

export const ItemLinks = ({
  mylistId,
  items,
}: {
  mylistId: number;
  items: MylistItem[];
}) => {
  return items.map(({ id, name }) => {
    const path = mylistRoute({ pathParams: { mylistId, itemId: id } });
    return (
      <ItemLink path={path} key={id}>
        {name}
      </ItemLink>
    );
  });
};
