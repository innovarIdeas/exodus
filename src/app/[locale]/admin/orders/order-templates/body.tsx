"use client";

import React, {  useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookDataTable } from "./data-table";
import BookVariantForm from "@/components/BookVariantForm";
import BulkOrderTemplateForm from "@/components/BulkOrderTemplateForm";
import { Button } from "@/components/ui/button";
import ExportAllBookVariants from "@/components/ExportAllBooVariant";
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

        <ExportAllBookVariants />

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
        <Sheet>
          <SheetTrigger >
            <Button    className="ml-4 px-6 whitespace-nowrap bg-main">
                 + Add Bulk Order Template
            </Button>
          </SheetTrigger>
          <SheetContent className="w-1/3 overflow-y-scroll">
            <SheetHeader className="flex text-start mb-5">
              <SheetTitle className="text-2xl">Upload Excel file</SheetTitle>
            </SheetHeader>
            {/* <BulkBookForm /> */}
            <BulkOrderTemplateForm />

          </SheetContent>
        </Sheet>

      </div>
      <div>
        <BookDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
