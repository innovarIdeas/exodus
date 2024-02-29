"use client";

import React, { useState } from "react";
import { IOrder } from "@/models/models";
import { OrderDataTable } from "./data-table";
import { QUERY_KEY } from "@/lib/rbac";
import { columns } from "./columns";
import { getAllOrders } from "@/lib/api-call";
import { useQuery } from "@tanstack/react-query";

export default function OrderBody () {
  const [bookData, setBookData] = useState<IOrder[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_ORDER],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllOrders();

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
      <div className="flex justify-end items-end mx-5 my-5">

      </div>
      <div>
        <OrderDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
