import Link from "next/link";
import React from "react";
import TransactionBody from "./body";
import { getPermissions } from "@/lib/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);
  const permissions = await getPermissions(session);

  if (!permissions.length) {
    return (
      <main className="flex flex-col items-center p-5">
        You are not authorized to view this page. Please login. <br/>
        <Link href="/" className="bg-primary text-white py-2 px-3.5 my-3">
          Go to login page
        </Link>
      </main>
    );
  }

  return <div className="mx-5">
    <TransactionBody/>
  </div>;
};

export default page;
