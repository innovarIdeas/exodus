"use client"
 
import { IBook } from "@/models/models"
import { ColumnDef } from "@tanstack/react-table"
 
export type BookProps = {
  title: string
  author: string
  created_at: string
  description: string
}
 
export const columns: ColumnDef<IBook>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const value = getValue()
      if(value === null) return <span>No Description</span>
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  

]