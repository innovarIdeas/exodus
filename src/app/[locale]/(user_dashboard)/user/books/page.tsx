"use client"

import DashboardTitle from '@/components/DashboardTitle'
import React from 'react'
import { BookTable } from './data-table'
import { useGetSingleUser, useGetUserBooks } from '@/lib/hook'
import { useSession } from "next-auth/react";
import { BookProps, columns } from "./columns";
import { IBook } from '@/models/models'

type Props = {}

const UserBooks = (props: Props) => {
  const session = useSession();
  const userBooks = useGetUserBooks(session.data?.user.id ?? '')

  const user = useGetSingleUser(session.data?.user.id ?? '');

  const data:IBook[] = userBooks ?? []


  return (
    <div>
      <div className='mb-10'>
        <DashboardTitle title='User Books' />
      </div>

      <div className="">
            <BookTable columns={columns} data={data} />
          </div>
    </div>
  )
}

export default UserBooks