"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { BookDataTable } from "./data-table";
import BookForm from "@/components/BookForm";
import { IBook } from "@/models/models";
import { columns } from "./columns";
import { getAllBooks } from "@/lib/api-call";

export default function BookBody () {
  const [bookData, setBookData] = useState<IBook[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getAllBooks();

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
      <div className="flex justify-end items-end float-right mx-5 my-5">

        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Add New Book</span>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Book</DialogTitle>
              <DialogDescription>
              Kindly fill the form with the book information
              </DialogDescription>
              <BookForm />
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
