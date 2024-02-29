"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditUserBookForm } from "@/components/EditUserBookForm";
import { IBook } from "@/models/models";
import React from "react";
import { deleteUserBook } from "@/lib/api-call";
import { toast } from "@/components/ui/use-toast";
import { useGetUserBooks } from "@/lib/hook";
import { useSession } from "next-auth/react";

export type BookProps = {
  title: string;
  author: string;
  created_at: string;
  description: string;
};

interface handleDeleteProps {
  book: IBook;
}

const HandleDelete = ({ book }: handleDeleteProps) => {
  const session = useSession();
  const { refetch } = useGetUserBooks(session.data?.user.id ?? "");

  const handleDelete = async (id: string) => {
    const { data, error, validationErrors } = await deleteUserBook(id);

    if (data) {
      toast({
        variant: "default",
        description: "Book deleted successfully",
      });
      refetch();
    }

    if (error) {
      toast({
        variant: "destructive",
        description: "Failed to Delete Book",
      });
    }

    if (validationErrors) {
      toast({
        variant: "destructive",
        description:
          "Failed to Deleted Book, please check that you have the permission",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm mx-2 cursor-pointer hover:font-semibold">
        Delete Book
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className="w-md  h-md p-4">
              Are you sure you want to delete this book?
              <div className="flex justify-center items-center  p-3 gap-5">
                <DialogClose>
                  <Button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red text-white  p-3 rounded-sm"
                  >
                    Delete
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button className="bg-gray hover:bg-gray2 text-black p-3 rounded-sm">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

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
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsHorizontalIcon className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Sheet>
                  <SheetTrigger
                    asChild
                    className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold"
                  >
                    <div>Edit Book</div>
                  </SheetTrigger>
                  <SheetContent className="w-1/3 overflow-y-scroll">
                    <SheetHeader className="flex text-start mb-5">
                      <SheetTitle className="text-2xl">
                        Edit Book
                      </SheetTitle>
                    </SheetHeader>
                    <EditUserBookForm id={book.id} title={book.title} description={book.description ? book.description : "no description"} author={book.author}/>
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <HandleDelete book={book} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
