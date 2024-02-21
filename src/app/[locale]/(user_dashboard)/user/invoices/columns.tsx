"use client"
 
import { ITransaction } from "@/models/models"
import { ColumnDef } from "@tanstack/react-table"
 
export type BookProps = {
  title: string
  author: string
  created_at: string
  description: string
}
 
export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "type",
    header: "Type",
  },  
  {
    accessorKey: "total",
    header: "Total",
  },

]