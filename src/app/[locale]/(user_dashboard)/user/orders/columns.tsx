"use client"
 
import { IOrder, ITransaction } from "@/models/models"
import { ColumnDef } from "@tanstack/react-table"
 
export type BookProps = {
  title: string
  author: string
  created_at: string
  description: string
}
 
export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "book_id",
    header: "Book ID",
  },
  {
    accessorKey: "payment_reference",
    header: "Payment Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
  },  
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "total",
    header: "Total",
  },

]