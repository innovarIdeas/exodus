"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DialogClose } from "@radix-ui/react-dialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditConstant } from "@/components/EditConstant";
import { IConstant } from "@/models/models";
import React from "react";
import { deleteConstant } from "@/lib/api-call";
import { toast } from "@/components/ui/use-toast";

interface handleDeleteProps {
  constant: IConstant;
}

const HandleDelete = ({ constant }: handleDeleteProps) => {
  const handleDelete = async (id: string) => {
    const { data, error, validationErrors } = await deleteConstant(id);

    if (data) {
      toast({
        variant: "default",
        description: "Constant deleted successfully",
      });
    }

    if (error) {
      toast({
        variant: "destructive",
        description: "Failed to Delete Constant",
      });
    }

    if (validationErrors) {
      toast({
        variant: "destructive",
        description:
          "Failed to Deleted Constant, please check that you have the permission",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm mx-2 cursor-pointer hover:font-semibold">
        Delete Constant
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className="w-md  h-md p-4">
              Are you sure you want to delete this constant?
              <div className="flex justify-center items-center  p-3 gap-5">
                <DialogClose>
                  <Button
                    onClick={() => handleDelete(constant.id)}
                    className="bg-red text-white  p-3 rounded-sm"
                  >
                    Delete
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button className="bg-gray hover:bg-gray2 text-black p-3 rounded-sm">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const columns: ColumnDef<IConstant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shortcode",
    header: "Short Code",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const constants = row.original;

      return (
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Sheet>
                  <SheetTrigger
                    asChild
                    className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold"
                  >
                    <div>Edit Constant</div>
                  </SheetTrigger>
                  <SheetContent className="w-1/3 overflow-y-scroll">
                    <SheetHeader className="flex text-start mb-5">
                      <SheetTitle className="text-2xl">
                        Edit Constant
                      </SheetTitle>
                    </SheetHeader>
                    <EditConstant constant={constants} />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <HandleDelete constant={constants} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
