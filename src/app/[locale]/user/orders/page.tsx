"use client";

import DashboardTitle from "@/components/DashboardTitle";
import { IOrder } from "@/models/models";
import { OrdersTable } from "./data-table";
import React from "react";
import { columns } from "./columns";
import {  useGetUserOrders } from "@/lib/hook";
import { useSession } from "next-auth/react";

const UserOrders = () => {
  const session = useSession();
  const userOrders = useGetUserOrders(session.data?.user.id ?? "");
  const data: IOrder[] = userOrders ?? [];

  return (
    <div>
      <DashboardTitle title="My Invoices" />

      <div className="mt-10">
        <OrdersTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserOrders;
