"use client";

import { ChecksUserPermission } from "@/lib/session-manager";
import Image from "next/image";
import Link from "next/link";
import { PERMISSION_CODES } from "@/lib/permissions-code";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminDashboard () {
  const session = useSession();

  if(session.status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-start bg-[url('/background.svg')] bg-cover bg-repeat  md:bg-repeat">
      <div className="text-lg font-semibold text-gray2 animate-[bounce_2s_ease-in-out] bg-transwhite shadow-lg rounded-lg p-5 m-2 w-[20%] md:w-[30%] sm:w-full">
          Welcome <span className="text-main font-bold">Jane Doe</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bg-transwhite gap-4   shadow-lg rounded-lg mx-[10%] px-[5%]">
        {ChecksUserPermission(PERMISSION_CODES.CREATE_BOOK) ||
          ChecksUserPermission(PERMISSION_CODES.READ_BOOK) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_BOOK) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_BOOK) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/books"
            >
              <Image src="/img/books.png" alt="Logo" width={64} height={64} />
              <h3 className="mt-4 font-bold text-sm text-black">Books</h3>
            </Link>
          ) : (
            ""
          )}
        {ChecksUserPermission(PERMISSION_CODES.CREATE_ORDER) ||
          ChecksUserPermission(PERMISSION_CODES.READ_ORDER) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_ORDER) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_ORDER) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/orders"
            >
              <Image src="/img/orders.png" alt="Logo" width={64} height={64} />
              <h3 className="mt-4 font-bold text-sm text-black">Orders</h3>
            </Link>
          ) : (
            ""
          )}
        {ChecksUserPermission(PERMISSION_CODES.CREATE_USER) ||
          ChecksUserPermission(PERMISSION_CODES.READ_USER) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_USER) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_USER) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/users"
            >
              <Image src="/img/users.png" alt="Logo" width={64} height={64} />
              <h3 className="mt-4 font-bold text-sm text-black">Users</h3>
            </Link>
          ) : (
            ""
          )}
        {ChecksUserPermission(PERMISSION_CODES.CREATE_INVOICE) ||
          ChecksUserPermission(PERMISSION_CODES.READ_INVOICE) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_INVOICE) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_INVOICE) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/invoices"
            >
              <Image src="/img/invoice.png" alt="Logo" width={64} height={64} />
              <h3 className="mt-4 font-bold text-sm text-black">Invoices</h3>
            </Link>
          ) : (
            ""
          )}
        {ChecksUserPermission(PERMISSION_CODES.CREATE_DISCOUNT) ||
          ChecksUserPermission(PERMISSION_CODES.READ_DISCOUNT) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_DISCOUNT) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_DISCOUNT) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/discounts"
            >
              <Image
                src="/img/discounts.png"
                alt="Logo"
                width={64}
                height={64}
              />
              <h3 className="mt-4 font-bold text-sm text-black">Discounts</h3>
            </Link>
          ) : (
            ""
          )}
        {ChecksUserPermission(PERMISSION_CODES.CREATE_TRANSACTION) ||
          ChecksUserPermission(PERMISSION_CODES.READ_TRANSACTOIN) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_TRANSACTION) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_TRANSACTION) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/transactions"
            >
              <Image
                src="/img/transaction.png"
                alt="Logo"
                width={64}
                height={64}
              />
              <h3 className="mt-4 font-bold text-sm text-black">
                Transactions
              </h3>
            </Link>
          ) : (
            ""
          )}
        {ChecksUserPermission(PERMISSION_CODES.CREATE_CONSTANT) ||
          ChecksUserPermission(PERMISSION_CODES.READ_CONSTANT) ||
          ChecksUserPermission(PERMISSION_CODES.UPDATE_CONSTANT) ||
          ChecksUserPermission(PERMISSION_CODES.DELETE_CONSTANT) ? (
            <Link
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href="/constants"
            >
              <Image
                src="/img/constants.png"
                alt="Logo"
                width={64}
                height={64}
              />
              <h3 className="mt-4 font-bold text-sm text-black">Constants</h3>
            </Link>
          ) : (
            ""
          )}
      </div>
    </main>
  );
}

