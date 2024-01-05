"use client";

import React, { useEffect, useState } from "react";
import { IOrder } from "@/models/models";
import { OrderDataTable } from "./data-table";
import { columns } from "./columns";
import { getPublisherOrders } from "@/lib/api-call";

export default function OrderBody () {
  const [bookData, setBookData] = useState<IOrder[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getPublisherOrders();

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

      </div>
      <div>
        <OrderDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
