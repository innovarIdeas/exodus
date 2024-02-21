"use client"
import DashboardTitle from '@/components/DashboardTitle'
import React from 'react'
import { TransactionsTable } from './data-table'
import { columns } from "./columns";
import { useGetSingleUser, useGetUserTransactions } from '@/lib/hook';
import { useSession } from 'next-auth/react';
import { ITransaction } from '@/models/models';

type Props = {}

const UserInvoice = (props: Props) => {
  const session = useSession();
  const userTransactions = useGetUserTransactions(session.data?.user.id ?? '')
  const data:ITransaction[] = userTransactions ?? []
  return (
    <div>
      <DashboardTitle title='Invoices' />

      <div className='mt-10'>
        <TransactionsTable columns={columns} data={data} />
      </div>

    </div>

    
  )
}

export default UserInvoice