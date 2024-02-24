"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import DeleteCoupon from "@/components/DeleteCoupon";
import { ICoupon } from "@/models/models";
import React from "react";
import UpdateCouponForm from "@/components/UpdateCoupon";

export const columns: ColumnDef<ICoupon>[] = [
  {
    accessorKey: "name",
    header: "Code",
  },
  {
    accessorKey: "status",
    header: "Active",

    cell: ({ row }) => {
      const coupon = row.original;

      if (coupon.status == true) {
        return (
          <div className="border-2 border-[#42be65] text-[#42be65] rounded-md text-center p-1 font-semibold">
              Active
          </div>
        );
      }else{
        return (
          <div className="border-2 border-red text-red rounded-md text-center p-1 font-semibold">
              Inactive
          </div>
        );
      }
    },
  },
  {
    accessorKey: "expires_at",
    header: "Valid Until",
  },
  {
    accessorKey: "client",
    header: "Client",

    cell: ({ row }) => {
      const coupon = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{coupon.created_by_user?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
  },
  {
    id: "Update",
    cell: ({ row }) => {
      const coupon = row.original;

      console.log(coupon);

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Edit Coupon</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Coupon</DialogTitle>
              <DialogDescription>
                      Kindly update the book`s` information
              </DialogDescription>
              <UpdateCouponForm id={coupon.id} status={coupon.status} />
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "Delete",
    cell: ({ row }) => {
      const coupon = row.original;

      console.log(coupon);

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-red text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Delete Coupon</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Coupon</DialogTitle>
              <DialogDescription>
                      Are you sure you want to delete this coupon?
              </DialogDescription>
              <DeleteCoupon id={coupon.id}/>
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },
];
