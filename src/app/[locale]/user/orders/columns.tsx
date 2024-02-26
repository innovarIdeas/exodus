"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/models/models";
import React from "react";

export type BookProps = {
  title: string;
  author: string;
  created_at: string;
  description: string;
};

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "book",
    header: "Book Name",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div>
          <span className="">{order?.book?.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_reference",
    header: "Payment Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "total",
    header: "Total",
  },

];
