"use client";

import { IBook, IBookVariant, IOrder, ITransaction } from "@/models/models";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invoiceColumns, orderColumns, transactionColumns } from "./columns";
import { BookInvoiceTable } from "./data-table-2";
import { BookTransactionTable } from "./data-table-3";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrderRequestTable } from "./data-table";
import OrderTemplateFormReadyToPrint from "@/components/OrderTemplateFormReadyToPrint";
import OrderTemplateFormWorkInProgress from "@/components/OrderTemplateFormWorkInProgress";
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
  const [tabButton, setTabButton] = useState("orderRequest");

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
    <div className="ml-8">
      <div className="mb-10">
        <div className="flex items-center gap-1 text-[17px] font-semibold">
          <Link href={"/user/books"}>Books </Link>
          <p>{">"}</p>
          <p>Book Details</p>
        </div>
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
          <TabsTrigger onClick={()=> setTabButton("orderRequest")} value="order-request" className={`px-2 py-1.5 ${tabButton === "orderRequest" ? "bg-slate-400 text-white" : ""}`} >Order Request</TabsTrigger>
          <TabsTrigger onClick={()=> setTabButton("bookInovoice")} value="book-invoice" className={`px-2 py-1.5 ${tabButton === "bookInovoice" ? "bg-slate-400 text-white" : ""}`}> Book Invoice</TabsTrigger>
          <TabsTrigger onClick={()=> setTabButton("bookTransaction")} value="book-transaction" className={`px-2 py-1.5 ${tabButton === "bookTransaction" ? "bg-slate-400 text-white" : ""}`}>Book Transactions</TabsTrigger>

        </TabsList>

        <div className="mt-2">

          <div className="flex justify-end items-end float-right mx-5 my-2 overflow-hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="ml-4 px-6 whitespace-nowrap bg-main">
                New Order Request
                </Button>
              </SheetTrigger>

              <SheetContent className="w-2/3 sm:w-full">
                <SheetHeader>
                  <SheetTitle>New Order Requestss</SheetTitle>
                </SheetHeader>
                {bookData?.status === "Ready to Print" ? <OrderTemplateFormReadyToPrint data={bookData} /> : <OrderTemplateFormWorkInProgress />}
              </SheetContent>
            </Sheet>
          </div>
        </div>

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
