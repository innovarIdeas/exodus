"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import CreatePrintStatus from "@/components/CreatePrintStatus";
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
    header: "Payment Status",
  },
  {
    accessorKey: "print_status",
    header: "Print Status",
    cell: ({ row }) => {
      const stats = row.original;

      if(stats.print_status === null || stats.print_status.length === 0) {
        return(<p>Recieved</p>);
      } else{
        return <div>{stats.print_status}</div>;
      }
    }
  },
  {
    accessorKey: "timestamp",
    header: "Date added",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className=" flex gap-1 justify-start ">
          <Link href={`orders/${order.id}`} className="rounded-full h-[40px] bg-main w-fix text-white text-x flex items-center justify-center cursor-pointer px-2 shadow-lg hover:shadow-none" >
                    View Order
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <span className="rounded-full h-[40px] bg-main w-fix text-white text-x flex items-center justify-center cursor-pointer px-2 shadow-lg hover:shadow-none">Create Transaction</span>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
              Create Transaction
                </SheetTitle>
              </SheetHeader>
              <CreateTransaction order_id={order.id}/>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <span className="rounded-full h-[40px] bg-main w-fix text-white text-x flex items-center justify-center cursor-pointer px-2 shadow-lg hover:shadow-none">Update Status</span>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
              Update Status
                </SheetTitle>
              </SheetHeader>
              <CreatePrintStatus order_id={order.id}/>
            </SheetContent>
          </Sheet>

        </div>
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
