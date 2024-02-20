
import { CardContent, CardProps, DashboardCard } from "@/components/DashboardCard";
import DashboardTitle from "@/components/DashboardTitle";
import { BanknoteIcon, BookAIcon, ShoppingCart, User } from "lucide-react";
import React from "react";
import { DataTable } from "./data-table";
import { BookProps, columns } from "./columns";


export default function CustomerDashboard () {
  const cardData : CardProps[] = [
    {
      label: 'Book Order',
      icon: ShoppingCart,
      description: 'This is a test desc',
      total: '550'
    },
    {
      label: 'Book Variant',
      icon: BookAIcon,
      description: 'This is a test desc',
      total: '100'
    },
    {
      label: 'Transaction',
      icon: BanknoteIcon,
      description: 'This is a test desc',
      total: '50'
    },
    {
      label: 'User Summary',
      icon: User,
      description: 'This is a test desc',
      total: '200'
    },
  ]

  const data: BookProps[] = [
    {
      book: 'The Keys to Success',
      author: 'Kenneth Boluwatife',
      noOfPage: 230,
      status: "failed"
    }, 
    {
      book: 'Atomic Habits',
      author: 'Brian Tracy',
      noOfPage: 290,
      status: "pending"
    }, 
    {
      book: 'Leadership Secrets',
      author: 'Jim Rohn',
      noOfPage: 330,
      status: "success"
    }, 
  ]
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
