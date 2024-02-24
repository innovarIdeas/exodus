"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DeleteUser from "@/components/DeleteUser";
import EditClientForm from "@/components/EditUserForm";
import { IUser } from "@/models/models";
import React from "react";

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
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Edit User</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update User</DialogTitle>
              <DialogDescription>
                      Kindly update the user`s` information
              </DialogDescription>
              <EditClientForm user={user}/>
            </DialogHeader>

          </DialogContent>
        </Dialog>
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
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-red text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Delete User</span>
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
