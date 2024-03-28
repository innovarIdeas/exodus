import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DeleteBook from "@/components/DeleteBook";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import EditBookForm from "@/components/EditBookForm";
import { IBook } from "@/models/models";
import React from "react";

interface BookdropDownProp {
  book: IBook;
}

export  const BookMenuDropdown = ({ book }: BookdropDownProp)=> {
  return(
    <div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsHorizontalIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> More Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>

            <Sheet>
              <SheetTrigger
                asChild
                className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold"
              >
                <div> Edit Book</div>
              </SheetTrigger>
              <SheetContent className="w-1/3 overflow-y-scroll">
                <SheetHeader className="flex text-start mb-5">
                  <SheetTitle className="text-2xl">
                  Update Book
                  </SheetTitle>
                </SheetHeader>
                <EditBookForm id={book.id} title={book.title} description={book.description ? book.description : "no description"}/>
              </SheetContent>
            </Sheet>

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Dialog>
              <DialogTrigger  asChild    className="text-sm mx-2 my-2 cursor-pointer hover:font-semibold">
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
    </div>

  );
};
