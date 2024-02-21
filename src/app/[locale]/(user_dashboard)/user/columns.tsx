"use client"
 
import { IBook } from "@/models/models"
import { ColumnDef } from "@tanstack/react-table"
 
 
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
  

]