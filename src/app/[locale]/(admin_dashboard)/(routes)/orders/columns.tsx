"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/models/models";
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
          <span>{book.client.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "total",
    header: "Total",
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
    accessorKey: "created_at",
    header: "Date added",
  },
  {
    id: "Update",
    cell: ({ row }) => {
      const book = row.original;

      console.log(book);

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">View Order</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>View Order</DialogTitle>
              <DialogDescription>
                      View Order information
              </DialogDescription>
              {/* <EditBookForm id={book.id} title={book.title} description={book.description ? book.description : "no description"}/> */}
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },
];
