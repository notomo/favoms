import { ScrollArea } from "~/component/ui/scrollArea";
import { importRoute } from "~/routePath/importRoute";
import { HistoryLink } from "~/routes/manage.import/rowLink";
import type { ImportHistory } from "./loader";

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
        className="font-bold text-lg"
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
