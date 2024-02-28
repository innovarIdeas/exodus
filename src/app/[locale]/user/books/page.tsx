"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookTable } from "./data-table";
import { Button } from "@/components/ui/button";
import DashboardTitle from "@/components/DashboardTitle";
import { IBook } from "@/models/models";
import React from "react";
import UserBookForm from "@/components/UserBookForm";
import { columns } from "./columns";
import { useGetUserBooks } from "@/lib/hook";
import { useSession } from "next-auth/react";

const UserBooks = () => {
  const session = useSession();
  const userBooks = useGetUserBooks(session.data?.user.id ?? "");
  const data: IBook[] = userBooks?.data ?? [];

  return (
    <div>
      <div className="mb-10">
        <DashboardTitle title="User Books" />
      </div>

      <div className="">
        <div className="flex justify-end items-end float-right mx-5 my-5 overflow-hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="ml-4 px-6 whitespace-nowrap bg-main">
                Add New Book
              </Button>
            </SheetTrigger>

            <SheetContent className="w-2/3 sm:w-full">
              <SheetHeader>
                <SheetTitle>Add New Book </SheetTitle>
              </SheetHeader>
              <UserBookForm />
            </SheetContent>
          </Sheet>
        </div>
        <BookTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserBooks;
