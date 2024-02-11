import { CreateMylistDialog } from "./create_mylist_dialog";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/component/ui/dropdown-menu";
import { useState } from "react";

export const CollectionsDropDownMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isCreateDialogOpened, setCreateDialogIsOpened] = useState(false);

  return (
    <>
      <CreateMylistDialog
        isOpened={isCreateDialogOpened}
        setIsOpened={setCreateDialogIsOpened}
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
              setCreateDialogIsOpened(true);
            }}
            className="cursor-pointer"
          >
            New
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
