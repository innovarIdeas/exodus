"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IBookVariant } from "@/models/models";
import Link from "next/link";
import React from "react";

export const columns: ColumnDef<IBookVariant>[] = [
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
    accessorKey: "variant_name",
    header: "Variant Name",
  },
  {
    accessorKey: "book",
    header: "Book Name",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.book?.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.book?.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
  },
  {
    id: "View",
    cell: ({ row }) => {
      const book = row.original;

      console.log(book);

      return (
        <Link href={`/orders/${book.id}`} className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
          View Variant
        </Link>
      );
    },
  },
];
