"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ITransaction } from "@/models/models";
import React from "react";
import UpdateTransaction from "@/components/updateTransaction";

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total",
    header: "Total",

    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{transaction.order.total}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-green text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Update</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Transaction</DialogTitle>
              <DialogDescription>
                      Are you sure you want to update this transaction?
              </DialogDescription>
              <UpdateTransaction tran_id={transaction.id} status={transaction.status}/>
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  }
];
