"use client";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import EditRole from "@/components/EditRole";
import { IRole } from "@/models/models";
import React from "react";
import zod from "zod";

const optionSchema = zod.object({
  value: zod.string(),
  label: zod.string(),
  id: zod.string(),
});

type TPermission = zod.infer<typeof optionSchema>;

export const columns: ColumnDef<IRole>[] = [
  {
    id: "name",
    header: "Nme",
    accessorKey: "name",
  },
  {
    id: "built_in",
    header: "Built in",
    accessorKey: "built_in",
    cell: ({ row }) => {
      const role = row.original;

      if (role.built_in) {
        return (
          <span className="text-green bg-lightgreen2 text-sm font-semibold py-1 px-3 rounded-lg">True</span>
        );
      } else {
        return (
          <span className="text-red bg-lightred text-sm font-semibold py-1 px-3 rounded-lg">False</span>
        );
      }
    }
  },
  {
    id: "active",
    header: "Active",
    accessorKey: "active",
    cell: ({ row }) => {
      const role = row.original;

      if (role.active) {
        return (
          <span className="text-green bg-lightgreen2 text-sm font-semibold py-1 px-3 rounded-lg">Active</span>
        );
      } else {
        return (
          <span className="text-red bg-lightred text-sm font-semibold py-1 px-3 rounded-lg">Inactive</span>
        );
      }
    }
  },
  {
    id: "view",
    header: "View",
    cell: ({ row }) => {
      const role = row.original;
      const permissions: TPermission[] = [];

      role.permissions.forEach((perm) => {
        permissions.push({ value: perm.permission_id, label: perm.permission.action + " - " + perm.permission.code, id: perm.permission_id });
      });

      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">Edit</Button>
          </SheetTrigger>

          <SheetContent className="w-1/3 sm:w-full">
            <SheetHeader className="flex text-start mb-5">
              <SheetTitle className="text-2xl">Edit Role</SheetTitle>
              <SheetClose/>
            </SheetHeader>
            <EditRole id={role.id} active={role.active} permissions={permissions} name={role.name}/>
          </SheetContent>
        </Sheet>

      );
    },
  },
];
