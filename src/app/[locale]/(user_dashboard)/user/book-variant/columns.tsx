"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IBookVariant } from "@/models/models";

export type BookProps = {
  title: string;
  author: string;
  created_at: string;
  description: string;
};

export const columns: ColumnDef<IBookVariant>[] = [
  {
    accessorKey: "variant_name",
    header: "Variant Name",
  },
  {
    accessorKey: "book_id",
    header: "Book ID",
  },
  {
    accessorKey: "tempbook_id",
    header: "TempBook ID"
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },

];
