import { Link, useNavigate, useParams } from "@remix-run/react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/component/ui/button";
import { Dialog, DialogContent } from "~/component/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/component/ui/dropdownMenu";
import { type MylistDialogType, mylistRoute } from "~/routePath/mylistRoute";
import { DeleteMylistDialog } from "./delete/dialog";
import { EditMylistInfoDialog } from "./editInfo/dialog";

const OneDialog = ({
  mylistName,
  dialogType,
}: {
  mylistName: string;
  dialogType: MylistDialogType;
}) => {
  switch (dialogType) {
    case "edit":
      return <EditMylistInfoDialog mylistName={mylistName} />;
    case "delete":
      return <DeleteMylistDialog />;
    case undefined:
      return null;
  }
};

export const MylistDropDownMenu = ({
  mylistId,
  mylistName,
  dialogType,
}: {
  mylistId: number;
  mylistName: string;
  dialogType: MylistDialogType;
}) => {
  const navigate = useNavigate();
  const rawPathParams = useParams();
  const close = () => {
    navigate(
      mylistRoute({
        pathParams: { mylistId },
        queryParams: { dialog: undefined },
        rawPathParams,
      }),
    );
  };

  return (
    <>
      <Dialog open={dialogType !== undefined} onOpenChange={close}>
        <DialogContent>
          <OneDialog mylistName={mylistName} dialogType={dialogType} />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border" align="start">
          <DropdownMenuButton asChild>
            <Link
              to={mylistRoute({
                pathParams: { mylistId },
                queryParams: { dialog: "edit" },
                rawPathParams,
              })}
            >
              Edit info
            </Link>
          </DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link
              to={mylistRoute({
                pathParams: { mylistId },
                queryParams: { edit: "items" },
                rawPathParams,
              })}
            >
              Edit items
            </Link>
          </DropdownMenuButton>

          <DropdownMenuSeparator />

          <DropdownMenuButton asChild>
            <Link
              to={mylistRoute({
                pathParams: { mylistId },
                queryParams: { dialog: "delete" },
                rawPathParams,
              })}
            >
              Delete
            </Link>
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
