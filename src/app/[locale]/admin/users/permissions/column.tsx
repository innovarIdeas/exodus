"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IPermission } from "@/models/models";

export const columns: ColumnDef<IPermission>[] = [
  {
    id: "code",
    header: "Code",
    accessorKey: "code",
  },
  {
    id: "module",
    header: "Module",
    accessorKey: "module",
  },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "action",
  },
  {
    id: "resource_id",
    header: "Resource ID",
    accessorKey: "resource_id",
  },
];
