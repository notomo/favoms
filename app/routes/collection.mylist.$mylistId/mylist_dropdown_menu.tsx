import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuButton,
} from "~/component/ui/dropdown-menu";
import { useState } from "react";
import { EditMylistInfoDialog } from "./edit_mylist_info_dialog";
import { DeleteMylistDialog } from "~/routes/collection.mylist.$mylistId/delete_mylist_dialog";
import { Dialog, DialogContent } from "~/component/ui/dialog";
import { Link } from "@remix-run/react";
import { mylistItemsEditRoute } from "~/route_path";

type DialogType = "edit" | "delete" | undefined;

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
}: {
  mylistId: number;
  mylistName: string;
}) => {
  const [dialogType, setDialogType] = useState<DialogType>(undefined);
  const openEditDialog = () => setDialogType("edit");
  const openDeleteDialog = () => setDialogType("delete");
  const close = () => setDialogType(undefined);

  return (
    <>
      <Dialog open={dialogType !== undefined} onOpenChange={close}>
        <DialogContent onSubmit={close}>
          <OneDialog mylistName={mylistName} dialogType={dialogType} />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border border-gray-600" align="start">
          <DropdownMenuButton onClick={openEditDialog}>
            Edit info
          </DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link to={mylistItemsEditRoute(mylistId)}>Edit items</Link>
          </DropdownMenuButton>

          <DropdownMenuSeparator />

          <DropdownMenuButton onClick={openDeleteDialog}>
            Delete
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
