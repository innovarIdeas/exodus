"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookVariantTable } from "./data-table";
import { Button } from "@/components/ui/button";
import DashboardTitle from "@/components/DashboardTitle";
import { IBookVariant } from "@/models/models";
import React from "react";
import UserBookVariantForm from "@/components/UserBookVariantForm";
import { columns } from "./columns";
import { useGetUserBookVariants } from "@/lib/hook";
import { useSession } from "next-auth/react";

const BookVariant = () => {
  const session = useSession();
  const userBookVariants = useGetUserBookVariants(session.data?.user.id ?? "");
  const data: IBookVariant[] = userBookVariants?.data ?? [];

  return (
    <div>
      <DashboardTitle title="My Order Request" />

      <div className="mt-10">
        <div className="flex justify-end items-end float-right mx-5 my-5 overflow-hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="ml-4 px-6 whitespace-nowrap bg-main">
                Create Book Variant
              </Button>
            </SheetTrigger>

            <SheetContent className="w-2/3 sm:w-full">
              <SheetHeader>
                <SheetTitle>Create Book Variant</SheetTitle>
              </SheetHeader>
              <UserBookVariantForm />
            </SheetContent>
          </Sheet>
        </div>

        <BookVariantTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BookVariant;
