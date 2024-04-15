"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IBookVariant, IOrder, ITransaction } from "@/models/models";
import { ColumnDef } from "@tanstack/react-table";
import CreateOrder from "@/components/CreateOrder";
import FormatDate from "@/components/FormatDate";
import Link from "next/link";
import React from "react";

export type BookProps = {
  title: string;
  author: string;
  created_at: string;
  description: string;
};

export const orderColumns: ColumnDef<IBookVariant>[] = [
  {
    header: "Request Id",
    id: "variant_name",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <p>{book.variant_name}</p>
      );
    }
  },
  {
    accessorKey: "created_at",
    header: "Date of Request",
    cell: ({ row }) => <FormatDate date={row.original.created_at} />,
  },
  {
    accessorKey: "no_of_books",
    header: "No of Copies",
  },
  {
    accessorKey: "number_of_pages",
    header: "No of Pages",
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <p>{book.status}</p>
      );
    }
  },
  {
    id: "Order",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <Dialog>
          <DialogTrigger className="rounded-sm h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Place Order</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 overflow-auto">
            <DialogHeader>
              <DialogTitle>Place Order</DialogTitle>
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
  {
    id: "view",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <Link href={`/user/book-variant/${book.id}`} ><button className="rounded-sm h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">View</button></Link>
      );
    },
  },
];

export const invoiceColumns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "id",
    header: "Invoice Number"
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "created_at",
    header: "Created At",
    cell: ({ row }) => <FormatDate date={row.original.created_at} />,
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

export const transactionColumns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "title",
    header: "Book Name",
  },
  {
    accessorKey: "author",
    header: "Payment Reference",
  },
  {
    accessorKey: "description",
    header: "Status",
  },
  {
    accessorKey: "description",
    header: "Date Added",
  },
  {
    accessorKey: "description",
    header: "Total",
  },

];
