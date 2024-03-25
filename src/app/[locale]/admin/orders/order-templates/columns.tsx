"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import CreateOrder from "@/components/CreateOrder";
import FormatDate from "@/components/FormatDate";
import { IBookVariant } from "@/models/models";
import React from "react";
import ViewBookVariant from "@/components/ViewBookVariant";

export const columns: ColumnDef<IBookVariant>[] = [
  {
    accessorKey: "serial_number",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "variant_name",
    header: "Order Template Name",
  },
  {
    accessorKey: "status",
    header: "Order Type",
  },
  {
    accessorKey: "book",
    header: "Book Name",

    cell: ({ row }) => {
      const bookVariant = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{bookVariant.book?.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",

    cell: ({ row }) => {
      const bookVariant = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{bookVariant.book?.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
    cell: ({ row }) => {
      const bookVariant = row.original;

      return (
        <>
          <span><FormatDate date={bookVariant?.created_at}/></span>
        </>

      );
    },
  },
  {
    id: "View",
    cell: ({ row }) => {
      const bookVariant = row.original;

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">View Order Template </span>
          </DialogTrigger>
          <DialogContent className="w-1/2 h-full overflow-auto">
            <DialogHeader>
              <DialogTitle>View Order Template</DialogTitle>
              <DialogDescription>
                Kindly view the book`s` information
              </DialogDescription>
              ;
              <ViewBookVariant
                variant_name={bookVariant.variant_name}
                book_name={bookVariant.book.title}
                description={bookVariant.book.description ? bookVariant.book.description : ""}
                number_of_words={bookVariant.number_of_words}
                hard_cover={bookVariant?.hard_cover}
                BW_print={bookVariant.BW_print}
                both_print={bookVariant.both_print}
                color_print={bookVariant.color_print}
                cream_paper={bookVariant.cream_paper}
                glossy_paper={bookVariant.glossy_paper}
                news_print={bookVariant.news_print}
                binding_type={bookVariant.binding}
                white_paper={bookVariant.white_paper}
                no_of_books={bookVariant.no_of_books}
                portrait={bookVariant.portrait}
                quantity_of_Color={
                  bookVariant.quantity_of_Color && bookVariant.quantity_of_Color
                }
                quantity_of_BW={bookVariant.quantity_of_BW}
                book_size={bookVariant.book_size}
                number_of_pages={bookVariant.number_of_pages}
                inside_layout={bookVariant.inside_layout}
                proof_reading={bookVariant.proof_reading}
                cover_design={bookVariant.cover_design}
                cover_design_type={bookVariant.cover_design_type}
                editing={bookVariant.editing}
                ISBN={bookVariant.ISBN}
                online_sales={bookVariant.online_sale}
                embossing={bookVariant.embossing}
                lamination={bookVariant.lamination}
                foiling={bookVariant.foiling}
                project_type={bookVariant.project_type}
                readyToPrint={bookVariant.ready_to_print}
                published={bookVariant.published}
                workInProgress={bookVariant.work_in_progress}
                inside_layout_type={bookVariant.inside_layout_type}
                art_illustration={bookVariant.art_illustration}
                art_illustration_type={bookVariant.art_illustration_type}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "Order",
    cell: ({ row }) => {
      const bookVariant = row.original;

      return (
        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Create Order</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 overflow-auto">
            <DialogHeader>
              <DialogTitle>Create Order</DialogTitle>
              <DialogDescription>
                      Are you sure you want to create this order?
              </DialogDescription>

              <CreateOrder book_variant_id={bookVariant.id} />
            </DialogHeader>

          </DialogContent>
        </Dialog>
      );
    },
  },

];
