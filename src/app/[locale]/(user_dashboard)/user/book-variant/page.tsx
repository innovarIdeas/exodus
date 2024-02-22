"use client";

import { BookVariantTable } from "./data-table";
import DashboardTitle from "@/components/DashboardTitle";
import { IBookVariant } from "@/models/models";
import React from "react";
import { columns } from "./columns";
import { useGetUserBookVariants } from "@/lib/hook";
import { useSession } from "next-auth/react";

const BookVariant = () => {
  const session = useSession();
  const userBookVariants = useGetUserBookVariants(session.data?.user.id ?? "");
  const data: IBookVariant[] = userBookVariants ?? [];

  return (
    <div>
      <DashboardTitle title="Book Variant" />

      <div className="mt-10">
        <BookVariantTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BookVariant;
