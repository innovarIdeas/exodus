"use client";

import DashboardTitle from "@/components/DashboardTitle";
import { ITransaction } from "@/models/models";
import React from "react";
import { TransactionsTable } from "./data-table";
import { columns } from "./columns";
import {  useGetUserTransactions } from "@/lib/hook";
import { useSession } from "next-auth/react";

const UserInvoice = () => {
  const session = useSession();
  const userTransactions = useGetUserTransactions(session.data?.user.id ?? "");
  const data: ITransaction[] = userTransactions ?? [];

  return (
    <div>
      <DashboardTitle title="My Invoices" />

      <div className="mt-10">
        <TransactionsTable columns={columns} data={data} />
      </div>

    </div>

  );
};

export default UserInvoice;
