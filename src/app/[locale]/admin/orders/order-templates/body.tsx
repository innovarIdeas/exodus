"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, {  useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { BookDataTable } from "./data-table";
import BookVariantForm from "@/components/BookVariantForm";
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

        <Dialog >
          <DialogTrigger className="rounded-md h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Add Order Template</span>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Order Template</DialogTitle>
              <BookVariantForm/>
            </DialogHeader>

          </DialogContent>
        </Dialog>

      </div>
      <div>
        <BookDataTable columns={columns} data={bookData} />
      </div>

    </div>
  );
}
