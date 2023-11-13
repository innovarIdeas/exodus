"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/models/models";
import Link from "next/link";
import React from "react";

export const columns: ColumnDef<IOrder>[] = [
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
    accessorKey: "client",
    header: "Client",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.client?.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "book_name",
    header: "Book Name",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.book_variant.book.title}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "book_variant",
    header: "Book Variant",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.book_variant.variant_name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "timestamp",
    header: "Date added",
  },
  {
    id: "Update",
    cell: ({ row }) => {
      const book = row.original;

      console.log(book);

      return (
        <Link href={`/orders/${book.id}`} className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
          View Order
        </Link>
      );
    },
  },
];
