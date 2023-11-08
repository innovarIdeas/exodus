"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import BookForm from "@/components/BookForm";
import { IOrder } from "@/models/models";
import { OrderDataTable } from "./data-table";
import { columns } from "./columns";
import { getAllOrders } from "@/lib/api-call";

export default function OrderBody () {
  const [bookData, setBookData] = useState<IOrder[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getAllOrders();

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
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Create New Order</span>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new order</DialogTitle>
              <DialogDescription>
              Kindly fill the form with the order information
              </DialogDescription>
              <BookForm />
            </DialogHeader>

          </DialogContent>
        </Dialog>

      </div>
      <div>
        <OrderDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
