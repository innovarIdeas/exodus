"use client";

import { BookMenuDropdown } from "@/components/BookMenuDropDown";
import { ColumnDef } from "@tanstack/react-table";
import FormatDate from "@/components/FormatDate";
import { IBook } from "@/models/models";
import React from "react";

export const columns: ColumnDef<IBook>[] = [
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
