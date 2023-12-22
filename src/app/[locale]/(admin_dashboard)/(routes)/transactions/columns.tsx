"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITransaction } from "@/models/models";
import React from "react";

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total",
    header: "Total",

    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{transaction.order.total}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
  },
];
