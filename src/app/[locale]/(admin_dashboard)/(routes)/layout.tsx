"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import React from "react";
import { formatDateText } from "@/utils/formatDate";
import { titleCase } from "@/utils/formatText";
import { usePathname } from "next/navigation";

interface adminRouteLayoutProps {
  children: React.ReactNode;
}

const adminRouteLayout: React.FC<adminRouteLayoutProps> = ({ children }) => {
  const pathName = usePathname().replace(/^\//, "");

  return (
    <>
      <div className="w-full h-[200px]">
        <div className="w-full h-[50%] flex items-center justify-between px-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center w-fit h-fit gap-1">
                <h1 className="text-2xl font-bold">{titleCase(pathName)}</h1>
                <AiFillCaretDown className="text-lg text-black shrink-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/books" className="text-lg">
                  Books
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/discounts" className="text-lg">
                  Discounts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/coupons" className="text-lg">
                  Coupons
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/transactions" className="text-lg">
                  Transactions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/orders" className="text-lg">
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/users" className="text-lg">
                  Users
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/publishers" className="text-lg">
                Publishers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/constants" className="text-lg">
                  Constants
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <div className="w-full h-[50%] flex items-center justify-between px-5">

          <h1> {formatDateText(new Date().toISOString())}</h1>
        </div>
      </div>
      {children}
    </>
  );
};

export default adminRouteLayout;
