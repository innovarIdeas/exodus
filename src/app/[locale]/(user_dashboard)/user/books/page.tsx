"use client";

import { BookTable } from "./data-table";
import DashboardTitle from "@/components/DashboardTitle";
import { IBook } from "@/models/models";
import React from "react";
import { columns } from "./columns";
import { useGetUserBooks } from "@/lib/hook";
import { useSession } from "next-auth/react";

const UserBooks = () => {
  const session = useSession();
  const userBooks = useGetUserBooks(session.data?.user.id ?? "");
  const data: IBook[] = userBooks ?? [];

  return (
    <div>
      <div className="mb-10">
        <DashboardTitle title="User Books" />
      </div>

      <div className="">
        <BookTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserBooks;
