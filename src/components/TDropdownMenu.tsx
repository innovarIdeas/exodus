import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { IUser } from "@/models/models";
import { MoreHorizontal } from "lucide-react";
import { deleteUser } from "@/lib/api-call";
import { useToast } from "@/components/ui/use-toast";

export const TDropdownMenu = ({ user }: { user: IUser }) => {
  const { toast } = useToast();

  const deleteUserFn = async (id: string) => {
    const { data, error, validationErrors } = await deleteUser(id);

    if (data) {
      toast({
        variant: "default",
        description: "User Deleted successfully!",
        title: "Success",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to Delete User.",
      });
    }

    console.error("Failed to Create Product", error);

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message,
      });

      return;
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit User</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View User</DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>Delete User</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete user {user.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteUserFn(user.id)}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </DropdownMenu>
    </AlertDialog>
  );
};

export default TDropdownMenu;
