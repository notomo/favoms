import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuButton,
} from "~/component/ui/dropdownMenu";
import { EditMylistInfoDialog } from "./editInfo/dialog";
import { DeleteMylistDialog } from "./delete/dialog";
import { Dialog, DialogContent } from "~/component/ui/dialog";
import { Link, useNavigate } from "@remix-run/react";
import { MylistDialogType, mylistRoute } from "~/routePath/mylistRoute";

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
  const close = () => {
    navigate(
      mylistRoute({
        pathParams: { mylistId },
        queryParams: { dialog: undefined },
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
