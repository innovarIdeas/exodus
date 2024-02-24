"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { DiscountDataTable } from "./data-table";
import DiscountForm from "@/components/DiscountFom";
import { IDiscount } from "@/models/models";
import { columns } from "./columns";
import { getAllDiscounts } from "@/lib/api-call";

export default function DiscountBody () {
  const [bookData, setBookData] = useState<IDiscount[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getAllDiscounts();

    if (data) setBookData(data);

    if (validationErrors?.length) {
      console.error(validationErrors);

      return;
    }

    if (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData();
  }, [fetchData]);

  return(
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">

        <Dialog>
          <DialogTrigger  className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Add New Discount</span>

          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Add Discount</DialogTitle>
              <DialogDescription>
              Kindly fill the form with the discount information
              </DialogDescription>
              <DiscountForm />
            </DialogHeader>

          </DialogContent>
        </Dialog>

      </div>
      <div>
        <DiscountDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
