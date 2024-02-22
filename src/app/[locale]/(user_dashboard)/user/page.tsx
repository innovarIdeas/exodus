
"use client";

import { BanknoteIcon, BookAIcon, BookAudioIcon, ShoppingCart } from "lucide-react";
import { CardContent, CardProps, DashboardCard } from "@/components/DashboardCard";
import DashboardTitle from "@/components/DashboardTitle";
import { DataTable } from "./data-table";
import { IBook } from "@/models/models";
import React from "react";
import { columns } from "./columns";
import { redirect } from "next/navigation";
import { useGetSingleUser } from "@/lib/hook";
import { useSession } from "next-auth/react";

export default function CustomerDashboard () {
  const session = useSession();

  if(session.status === "unauthenticated") {
    redirect("/login");
  }

  const user = useGetSingleUser(session.data?.user.id ?? "");

  const cardData: CardProps[] = [
    {
      label: "Order",
      icon: ShoppingCart,
      description: "Current number of user's book order",
      total: user?.order?.length
    },
    {
      label: "Books",
      icon: BookAIcon,
      description: "Current number of user's books",
      total: user?.created_books.length
    },
    {
      label: "Transaction",
      icon: BanknoteIcon,
      description: "Transaction details",
      total: user?.transactions.length
    },
    {
      label: "Book Variant",
      icon: BookAudioIcon,
      description: "Current number of user's book variant",
      total: user?.book_variant.length
    },
  ];

  const data: IBook[] = user?.created_books ?? [];

  return (
    <div className="">
      <DashboardTitle title="User Dashboard" />

      <section className="grid my-6 w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((card, index) => <DashboardCard key={index} label={card.label} icon={card.icon} description={card.description} total={card.total} />)}
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 transition-all">
        <CardContent className="bg-gradient-to-tl from-gray-200 to-gray-50">
          <h2 className="text-xl font-semibold">Book Order History</h2>
          <div className="">
            <DataTable columns={columns} data={data} />
          </div>
        </CardContent>

        <CardContent className="min-h-[320px] bg-gradient-to-tl from-gray-100 to-gray-50">
          <h2 className="text-xl font-semibold">Recent Activities</h2>

          <p className="mx-auto mt-10">No recent activities</p>
        </CardContent>
      </section>

    </div>
  );
}
