"use client";

import React, { useEffect, useState } from "react";
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
      <div className="flex justify-end items-end mx-5 my-5">

        {/* <Sheet>
          <SheetTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Create New Order</span>

          </SheetTrigger>
          <SheetContent className="w-1/2 h-full overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Add a new order</SheetTitle>
              <SheetDescription>
              Kindly fill the form with the order information
              </SheetDescription>
            </SheetHeader>
            <OrderForm />
          </SheetContent>
        </Sheet> */}

      </div>
      <div>
        <OrderDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
