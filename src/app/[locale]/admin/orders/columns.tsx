"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import CreateTransaction from "@/components/CreateTransaction";
import { IOrder } from "@/models/models";
import Link from "next/link";
import { PayStackOrderPayment } from "@/components/PayStackorderPayment";
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
          <span>{book.book_variant.book?.client?.name}</span>
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
      const order = row.original;

      return (
        <Link href={`orders/${order.id}`} className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
          View Order
        </Link>
      );
    },
  },
  {
    id: "Pay",
    cell: ({ row }) => {
      const order = row.original;

      console.log(order);

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Create Transaction</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 overflow-auto">
            <DialogHeader>
              <DialogTitle>Create Transaction</DialogTitle>
              <DialogDescription>
                      Are you sure you want to create this Transaction?
              </DialogDescription>

              <CreateTransaction order_id={order.id}/>
            </DialogHeader>

          </DialogContent>
        </Dialog>

      );
    },
  },
  {
    id: "Pay Now",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <PayStackOrderPayment order={order}/>
      );
    },
  }
];
