"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDiscount from "@/components/DeleteDiscount";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IDiscount } from "@/models/models";
import React from "react";

export const columns: ColumnDef<IDiscount>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "expires_at",
    header: "Valid Until",
  },
  {
    accessorKey: "book",
    header: "Book",

    cell: ({ row }) => {
      const discount = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{discount.book?.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
  },
  {
    id: "Delete",
    cell: ({ row }) => {
      const discount = row.original;

      console.log(discount);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DotsHorizontalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel> More Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>

              <Dialog>
                <DialogTrigger className="rounded-full h-[40px] w-fit bg-red text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
                  <span className="text-white">Delete Discount</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Discount</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this coupon?
                    </DialogDescription>
                    <DeleteDiscount id={discount.id}/>
                  </DialogHeader>

                </DialogContent>
              </Dialog>

            </DropdownMenuItem>

            <DropdownMenuSeparator />

          </DropdownMenuContent>
        </DropdownMenu>

      );
    },
  },
];
