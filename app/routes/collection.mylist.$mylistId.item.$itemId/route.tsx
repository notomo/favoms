import * as CollectionItemRoute from "~/routes/collection.all.item.$itemId/route";

export const meta = CollectionItemRoute.meta;

export const loader = CollectionItemRoute.loader;

export default function Page() {
  return CollectionItemRoute.default();
}
