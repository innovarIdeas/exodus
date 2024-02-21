"use client"
import DashboardTitle from '@/components/DashboardTitle'
import { useGetSingleUser, useGetUserBookVariants } from '@/lib/hook';
import { IBookVariant } from '@/models/models';
import { useSession } from 'next-auth/react';
import React from 'react'
import { BookVariantTable } from './data-table';
import { columns } from "./columns";

type Props = {}

const BookVariant = (props: Props) => {
  
  const session = useSession();
  const userBookVariants = useGetUserBookVariants(session.data?.user.id ?? '')
  const data:IBookVariant[] = userBookVariants ?? []

  return (
    <div>
      <DashboardTitle title='Book Variant' />

      <div className='mt-10'>
        <BookVariantTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default BookVariant