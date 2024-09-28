import { ScrollArea } from "~/component/ui/scrollArea";
import type { ImportHistory } from "./loader";
import { HistoryLink } from "~/routes/manage.import/rowLink";
import { importRoute } from "~/routePath/importRoute";

export const ImportHistoryList = ({
  histories,
}: {
  histories: ImportHistory[];
}) => {
  return (
    <ScrollArea className="h-full border">
      <HistoryLink
        end={true}
        path={importRoute({})}
        className="text-lg font-bold"
      >
        No selected
      </HistoryLink>

      {histories.map((history) => {
        return (
          <HistoryLink
            key={history.id}
            path={importRoute({ pathParams: { importHistoryId: history.id } })}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-lg">{history.name}</p>
              <p>{history.at}</p>
            </div>
          </HistoryLink>
        );
      })}
    </ScrollArea>
  );
};
