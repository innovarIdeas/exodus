"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { BookDataTable } from "./data-table";
import BookVariantForm from "@/components/BookVariantForm";
import { IBookVariant } from "@/models/models";
import { columns } from "./columns";
import { getAllBookVariants } from "@/lib/api-call";

export default function BookBody () {
  const [bookData, setBookData] = useState<IBookVariant[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getAllBookVariants();

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
      <div className="flex justify-end items-end float-right mx-5 my-5 overflow-hidden">

        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Add New Book Variant</span>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Book Variant</DialogTitle>
              <DialogDescription>
              Kindly fill the form with the book information
              </DialogDescription>
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
