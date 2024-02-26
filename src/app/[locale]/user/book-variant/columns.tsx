"use client";

import { DotsHorizontalIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { IBookVariant } from "@/models/models";
import React from "react";

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
    accessorKey: "book",
    header: "Book Name",
    cell: ({ row }) => {
      const bookVariant = row.original;

      return (
        <div>

          <span className="">{bookVariant?.book?.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "tempbook_id",
    header: "TempBook ID"
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className=" flex justify-start ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> More Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>

                <Button variant="ghost" title="" className="flex gap-3 items-start" name="view Line Items" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM16.7705 2.27591C18.1384 0.908028 20.3562 0.908028 21.7241 2.27591C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27591ZM20.6634 3.33657C19.8813 2.55448 18.6133 2.55448 17.8312 3.33657L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33657ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z" fill="#1C274C"/>
                  </svg>
                  <div>
                   Edit
                  </div>

                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>

                <Button variant="ghost" title="View Quotation" className="flex gap-3 items-start" name="View Quotation">
                  <EyeOpenIcon className="h-5 w-5 hover:h-6 hover:w-6 ease-in-out" />
                  <div> Delete</div>
                </Button>

              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>

              <Button variant="ghost" title="Quotation Note" className="flex gap-3 items-start" >
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 10C22.0185 10.7271 22 11.0542 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="19" cy="5" r="3" stroke="#1C274C" strokeWidth="1.5"/>
                  </svg>
                </div>

              </Button>

            </SheetTrigger>
            <SheetContent className="w-1/3 overflow-y-scroll">
              <SheetHeader className="flex text-start mb-5">
                <SheetTitle className="text-2xl">Quotation Note</SheetTitle>
              </SheetHeader>

            </SheetContent>
          </Sheet>

        </div>
      );
    }

  },

];
