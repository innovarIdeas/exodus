"use client";

import { IBook, IBookVariant, IOrder, ITransaction } from "@/models/models";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invoiceColumns, orderColumns, transactionColumns } from "./columns";
import { BookInvoiceTable } from "./data-table-2";
import { BookTransactionTable } from "./data-table-3";
import DashboardTitle from "@/components/DashboardTitle";
import { OrderRequestTable } from "./data-table";
import { QUERY_KEY } from "@/lib/rbac";
import { getSingleBook } from "@/lib/api-call";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const UserBooks = () => {
  const params = useParams() as { id: string };
  const [bookData, setBookData] = useState<IBook>();
  const [bookVariant, setBookVariant] = useState<IBookVariant[]>([]);
  const [bookInvoice, setBookInvoice] = useState<IOrder[]>([]);
  const [bookTransaction, setBookTransaction] = useState<ITransaction[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_SINGLE_BOOK],
    queryFn: async () => {
      if (!params.id) return;
      const { data, error, validationErrors } = await getSingleBook(params.id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.error(error);

        return;
      }

      if (data) {
        setBookData(data);
        setBookVariant(data.book_variants);
        setBookInvoice(data.Order);
        setBookTransaction(data.transactions);
      }

      return data;
    },
  });

  return (
    <div>
      <div className="mb-10">
        <DashboardTitle title="Book Details" />
      </div>
      <div className="grid grid-cols-2 my-10 w-[60%] min-w-72 text-lg font-semibold">

        <p>Book Title: </p>
        <p>{bookData?.title}</p>

        <p>Author: </p>
        <p>{bookData?.author}</p>

        <p>Description: </p>
        <p>{bookData?.description}</p>
      </div>

      <Tabs defaultValue="order-request">
        <TabsList className="w-full flex justify-start my-2 border">
          <TabsTrigger value="order-request" >Order Request</TabsTrigger>
          <TabsTrigger value="book-invoice"> Book Invoice</TabsTrigger>
          <TabsTrigger value="book-transaction">Book Transactions</TabsTrigger>

        </TabsList>
        <TabsContent value="order-request" >
          <OrderRequestTable columns={orderColumns} data={bookVariant} />
        </TabsContent>
        <TabsContent value="book-invoice">
          <BookInvoiceTable columns={invoiceColumns} data={bookInvoice} />
        </TabsContent>
        <TabsContent value="book-transaction">
          <BookTransactionTable columns={transactionColumns} data={bookTransaction} />
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default UserBooks;
