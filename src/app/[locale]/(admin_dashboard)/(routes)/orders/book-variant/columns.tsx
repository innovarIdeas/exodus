"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import CreateOrder from "@/components/CreateOrder";
import { IBookVariant } from "@/models/models";
import React from "react";
import ViewBookVariant from "@/components/ViewBookVariant";

export const columns: ColumnDef<IBookVariant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "variant_name",
    header: "Variant Name",
  },
  {
    accessorKey: "book",
    header: "Book Name",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.book?.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",

    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{book.book?.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
  },
  {
    id: "View",
    cell: ({ row }) => {
      const book = row.original;

      console.log(book);

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">View Variant</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 h-full overflow-auto">
            <DialogHeader>
              <DialogTitle>View Book Variant</DialogTitle>
              <DialogDescription>
                      Kindly view the book`s` information
              </DialogDescription>
              <ViewBookVariant variant_name={book.variant_name} book_name={book.book.title} description={book.book.description ? book.book.description : ""} number_of_words={book.number_of_words} hard_cover={book.hard_cover} BW_print={book.BW_print} both_print={book.both_print} color_print={book.color_print} cream_paper={book.cream_paper} glossy_paper={book.glossy_paper} news_print={book.news_print} binding_type={book.binding} white_paper={book.white_paper} no_of_books={book.no_of_books} portrait={book.portrait} quantity_of_Color={book.quantity_of_Color} quantity_of_BW={book.quantity_of_BW} book_size={book.book_size} number_of_pages={book.number_of_pages} inside_layout={book.inside_layout} proof_reading={book.proof_reading} cover_design={book.cover_design} cover_design_type={book.cover_design_type} editing={book.editing} ISBN={book.ISBN} online_sales={book.online_sale} embossing={book.embossing} lamination={book.lamination} foiling={book.foiling} project_type={book.project_type} readyToPrint={book.readyToPrint} published={book.published} workInProgress={book.workInProgress} inside_layout_type={book.inside_layout_type} art_illustration={book.art_illustration} art_illustration_type={book.art_illustration_type} />
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "Order",
    cell: ({ row }) => {
      const book = row.original;

      console.log(book);

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Order Variant</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 overflow-auto">
            <DialogHeader>
              <DialogTitle>Order Book Variant</DialogTitle>
              <DialogDescription>
                      Are you sure you want to order this book variant?
              </DialogDescription>

              <CreateOrder book_variant_id={book.id} />
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },
];
