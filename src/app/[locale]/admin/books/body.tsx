"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookDataTable } from "./data-table";
import BookForm from "@/components/BookForm";
import { Button } from "@/components/ui/button";
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

      </div>
      <div>
        <BookDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
