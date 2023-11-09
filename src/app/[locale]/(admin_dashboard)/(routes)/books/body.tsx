"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { DataTable } from "@/components/data-table";
import { IBook, IUser } from "@/models/models";
import BookForm from "@/components/BookForm";
import { columns } from "./columns";
import { getAllBooks, getAllUsers } from "@/lib/api-call";

const BooksBody = () => {
  const [booksData, setBooksData] = useState<IBook[]>([]);
  const [usersData, setUsersData] = useState<IUser[]>([]);

  const fetchData = async () => {
    const { data, error, validationErrors } = await getAllBooks();

    if (data) setBooksData(data);

    if (validationErrors?.length) {
      console.error(validationErrors);

      return;
    }

    if (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    const { data, error, validationErrors } = await getAllUsers();

    if (data) setUsersData(data);

    if (validationErrors?.length) {
      console.error(validationErrors);

      return;
    }

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, [fetchData, fetchUsers]);

  return (
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">
        <Dialog>
          <DialogTrigger>
            <div className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
              <BiPlusCircle className="text-white text-2xl" />{" "}
              <h1>Add New Book</h1>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Book</DialogTitle>
              <DialogDescription>
                Kindly fill the form with the book information
              </DialogDescription>
              <BookForm usersData={usersData} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable columns={columns} data={booksData} />
      </div>
    </div>
  );
};

export default BooksBody;
