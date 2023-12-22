"use client";

import React, { useEffect, useState } from "react";
import { DiscountDataTable } from "./data-table";
import { ITransaction } from "@/models/models";
import { columns } from "./columns";
import { getAllTransactions } from "@/lib/api-call";

export default function TransactionBody () {
  const [bookData, setBookData] = useState<ITransaction[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getAllTransactions();

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
      <div>
        <DiscountDataTable columns={columns} data={bookData} />
      </div>
    </div>
  );
}
