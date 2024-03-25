"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import DeleteBook from "@/components/DeleteBook";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import EditBookForm from "@/components/EditBookForm";
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
          {<FormatDate date={book?.created_at}/>}
        </div>
      );
    }
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsHorizontalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel> More Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger className="">
                  <span >Edit Book</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Book</DialogTitle>
                    <DialogDescription>
                      Kindly update the book`s` information
                    </DialogDescription>
                    <EditBookForm id={book.id} title={book.title} description={book.description ? book.description : "no description"}/>
                  </DialogHeader>

                </DialogContent>
              </Dialog>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger >
                  <span >Delete Book</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Book</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this book?
                    </DialogDescription>
                    <DeleteBook id={book.id}/>
                  </DialogHeader>

                </DialogContent>
              </Dialog>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      );
    },
  }
];
