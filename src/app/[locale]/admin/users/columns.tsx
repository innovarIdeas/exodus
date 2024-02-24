"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DeleteUser from "@/components/DeleteUser";
import { IUser } from "@/models/models";
import React from "react";
import ViewClient from "@/components/EditUser";

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Date Joined",
  },
  {
    id: "Update",
    cell: ({ row }) => {
      const user = row.original;

      console.log(user);

      return (

        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">Edit User</Button>
          </SheetTrigger>

          <SheetContent className="w-1/2 sm:w-full">

            <ViewClient user={user} />
          </SheetContent>
        </Sheet>

      );
    },
  },
  {
    id: "Delete",
    cell: ({ row }) => {
      const user = row.original;

      console.log(user);

      return (

        <Dialog>
          <DialogTrigger >

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                      Are you sure you want to delete this user?
              </DialogDescription>
              <DeleteUser id={user.id}/>
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },
];
