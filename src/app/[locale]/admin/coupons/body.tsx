"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { CouponDataTable } from "./data-table";
import CouponForm from "@/components/CouponForm";
import { ICoupon } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { columns } from "./columns";
import { getAllCoupons } from "@/lib/api-call";
import { useQuery } from "@tanstack/react-query";

export default function BookBody () {
  const [bookData, setBookData] = useState<ICoupon[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COUPONS],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllCoupons();

      if(data) setBookData(data);

      if(validationErrors?.length) {
        console.error(validationErrors);
      }

      if (error) {
        console.error(error);
      }
    }
  });

  return(
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">

        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Add New Coupon</span>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Coupon</DialogTitle>
              <DialogDescription>
              Kindly fill the form with the coupon information
              </DialogDescription>
              <CouponForm />
            </DialogHeader>

          </DialogContent>
        </Dialog>

      </div>
      <div>
        <CouponDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
