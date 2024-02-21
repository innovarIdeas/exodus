"use client"
import DashboardTitle from '@/components/DashboardTitle'
import { useGetSingleUser, useGetUserOrders } from '@/lib/hook';
import { useSession } from 'next-auth/react';
import React from 'react'
import { OrdersTable } from './data-table';
import { IOrder } from '@/models/models';
import { columns } from "./columns";



type Props = {}

const UserOrders = (props: Props) => {
  
  const session = useSession();
  const userOrders = useGetUserOrders(session.data?.user.id ?? '')
  const data:IOrder[] = userOrders ?? []

  return (
    <div>
      <DashboardTitle title='User Orders' />

      <div className='mt-10'>
        <OrdersTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default UserOrders