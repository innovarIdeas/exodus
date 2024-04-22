"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookDataTable } from "./data-table";
import BookForm from "@/components/BookForm";
import BulkBookForm from "@/components/BulkBookForm";
import { Button } from "@/components/ui/button";
import ExportAllBook from "@/components/ExportAllBook";
import { IBook } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { columns } from "./columns";
import { getAllBooks } from "@/lib/api-call";
import { useQuery } from "@tanstack/react-query";

export default function BookBody () {
  const [bookData, setBookData] = useState<IBook[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BOOKS],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllBooks();

      if(data) setBookData(data);

      if(validationErrors?.length) {
        console.error(validationErrors);
      }

      if (error) {
        console.error(error);
      }

      return data;
    }
  });

  return(
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">

        <ExportAllBook />

        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">
            Add New Book
            </Button>
          </SheetTrigger>

          <SheetContent className="w-2/3 sm:w-full">
            <BookForm />
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger >
            <Button    className="ml-4 px-6 whitespace-nowrap bg-main">
                 + Add Bulk Books
            </Button>
          </SheetTrigger>
          <SheetContent className="w-1/3 overflow-y-scroll">
            <SheetHeader className="flex text-start mb-5">
              <SheetTitle className="text-2xl">Upload Excel file</SheetTitle>
            </SheetHeader>
            <BulkBookForm />

          </SheetContent>
        </Sheet>

      </div>
      <div>
        <BookDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
