import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuButton,
} from "~/component/ui/dropdown-menu";
import { EditMylistInfoDialog } from "./edit_mylist_info_dialog";
import { DeleteMylistDialog } from "~/routes/collection.mylist.$mylistId/delete_mylist_dialog";
import { Dialog, DialogContent } from "~/component/ui/dialog";
import { Link, useNavigate } from "@remix-run/react";
import {
  DialogType,
  mylistDeleteRoute,
  mylistInfoEditRoute,
  mylistItemsEditRoute,
  mylistRoute,
} from "~/route_path";

const OneDialog = ({
  mylistName,
  dialogType,
}: {
  mylistName: string;
  dialogType: DialogType;
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
  dialogType: DialogType;
}) => {
  const navigate = useNavigate();
  const close = () => {
    navigate(mylistRoute(mylistId));
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
            <Link to={mylistInfoEditRoute(mylistId)}>Edit info</Link>
          </DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link to={mylistItemsEditRoute(mylistId)}>Edit items</Link>
          </DropdownMenuButton>

          <DropdownMenuSeparator />

          <DropdownMenuButton asChild>
            <Link to={mylistDeleteRoute(mylistId)}>Delete</Link>
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
