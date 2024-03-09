"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/models/models";
import Link from "next/link";
import React from "react";

export type BookProps = {
  title: string;
  author: string;
  created_at: string;
  description: string;
};

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    id: "View",
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <Link
          href={`/user/invoices/pdf/${invoice.id}`}
          className="rounded-sm h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none"
        >
          View
        </Link>
      );
    },
  },
];
