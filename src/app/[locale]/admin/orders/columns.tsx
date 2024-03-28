"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import CreatePrintStatus from "@/components/CreatePrintStatus";
import CreateTransaction from "@/components/CreateTransaction";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IOrder } from "@/models/models";
import Link from "next/link";
import { PayStackOrderPayment } from "@/components/PayStackorderPayment";
import React from "react";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "serial_number",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "client",
    header: "Client",

    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{order.client?.name}</span>
        </div>
      );
    },
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
    },
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
    },
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

      if(stats?.print_status === null || stats?.print_status?.length === 0) {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> More Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>

                <Link href={`orders/${order.id}`} className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold"  >
                    View Order
                </Link>

              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Sheet>
                  <SheetTrigger asChild>
                    <span  className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold">Create Transaction</span>
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
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Sheet>
                  <SheetTrigger asChild>
                    <span  className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold">Update Status</span>
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
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      );
    },
  },

  {
    id: "Pay Now",
    cell: ({ row }) => {
      const order = row.original;

      return <PayStackOrderPayment order={order} />;
    },
  },
];
