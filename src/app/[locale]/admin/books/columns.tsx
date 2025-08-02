"use client";

import { BookMenuDropdown } from "@/components/BookMenuDropDown";
// Temporarily comment out the import to bypass type checking
import type { ColumnDef } from "@tanstack/react-table";
import FormatDate from "@/components/FormatDate";
// We need to keep the IBook import for type safety in the actual application
// even though we're using 'any' temporarily
import type { IBook } from "@/models/models";
import React from "react";

// Using a more specific type to satisfy ESLint
export const columns: ColumnDef<IBook, unknown>[] = [
  {
    accessorKey: "serial_number",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
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
  },
  {
    accessorKey: "client",
    header: "Publisher",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.client?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
    cell: ({ row }) =>{
      const book =  row.original;

      return (
        <div>
          {< FormatDate date={book?.created_at}/>}
        </div>
      );
    }
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div>
          <BookMenuDropdown book={book} />
        </div>

      );
    },
  }
];
