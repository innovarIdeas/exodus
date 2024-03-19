"use client";

import DashboardTitle from "@/components/DashboardTitle";
import { IOrder } from "@/models/models";
import React from "react";
import { TransactionsTable } from "./data-table";
import { columns } from "./columns";
import { useGetUserOrders } from "@/lib/hook";
import { useSession } from "next-auth/react";

const UserInvoice = () => {
  const session = useSession();
  const userTransactions = useGetUserOrders(session.data?.user.id ?? "");
  const data: IOrder[] = userTransactions ?? [];

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
