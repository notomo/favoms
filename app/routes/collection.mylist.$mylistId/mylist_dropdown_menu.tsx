import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/component/ui/dropdown-menu";
import { useState } from "react";
import { EditMylistInfoDialog } from "./edit_mylist_info_dialog";
import { DeleteMylistDialog } from "~/routes/collection.mylist.$mylistId/delete_mylist_dialog";

export const MylistDropDownMenu = ({ mylistName }: { mylistName: string }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isEditDialogOpened, setEditDialogIsOpened] = useState(false);
  const [isDeleteDialogOpened, setDeleteDialogIsOpened] = useState(false);

  return (
    <>
      <EditMylistInfoDialog
        mylistName={mylistName}
        isOpened={isEditDialogOpened}
        setIsOpened={setEditDialogIsOpened}
      />
      <DeleteMylistDialog
        isOpened={isDeleteDialogOpened}
        setIsOpened={setDeleteDialogIsOpened}
      />

      <DropdownMenu open={isOpened} onOpenChange={(o) => setIsOpened(o)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border border-gray-600" align="start">
          <DropdownMenuItem
            onClick={() => {
              setEditDialogIsOpened(true);
            }}
            className="cursor-pointer"
          >
            Edit info
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setDeleteDialogIsOpened(true);
            }}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
