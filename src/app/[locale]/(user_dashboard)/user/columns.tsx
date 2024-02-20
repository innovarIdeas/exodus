"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
export type BookProps = {
  book: string
  noOfPage: number
  status: "pending" | "processing" | "success" | "failed"
  author: string
}
 
export const columns: ColumnDef<BookProps>[] = [
  {
    accessorKey: "book",
    header: "Book",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "noOfPage",
    header: "No of Pages",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

]