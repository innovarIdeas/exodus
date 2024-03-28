"use client";

import React, {  useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookDataTable } from "./data-table";
import BookVariantForm from "@/components/BookVariantForm";
import { Button } from "@/components/ui/button";
import { IBookVariant } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { columns } from "./columns";
import { getAllBookVariants } from "@/lib/api-call";
import { useQuery } from "@tanstack/react-query";

export default function BookBody () {
  const [bookData, setBookData] = useState<IBookVariant[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BOOK_VARIANTS],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllBookVariants();

      if (data) setBookData(data);

      if (validationErrors?.length) {
        console.error(validationErrors);

        return;
      }

      if (error) {
        console.error(error);
      }

      return data;
    }
  });

  return(
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5 overflow-hidden">

        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">
            Add Order Template
            </Button>
          </SheetTrigger>

          <SheetContent className="w-2/3 sm:w-full overflow-y-auto">
            <BookVariantForm/>
          </SheetContent>
        </Sheet>

      </div>
      <div>
        <BookDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
