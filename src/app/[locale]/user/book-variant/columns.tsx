"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import CreateOrder from "@/components/CreateOrder";
import FormatDate from "@/components/FormatDate";
import { IBookVariant } from "@/models/models";
import React from "react";

export type BookProps = {
  title: string;
  author: string;
  created_at: string;
  description: string;
};

export const columns: ColumnDef<IBookVariant>[] = [
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
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <FormatDate date={row.original.created_at} />,
  },
  {
    id: "Order",
    cell: ({ row }) => {
      const book = row.original;

      console.log(book);

      return (
        <Dialog>
          <DialogTrigger className="rounded-sm h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Create Order</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 overflow-auto">
            <DialogHeader>
              <DialogTitle>Create Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to create this order?
              </DialogDescription>

              <CreateOrder book_variant_id={book.id} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
