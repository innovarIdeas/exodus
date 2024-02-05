"use client";

import { AdminNavLinks } from "@/utils/AdminNavLinks";
import Image from "next/image";
import Link from "next/link";
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
        {AdminNavLinks.map((adminLink) => {
          return (
            <Link
              key={adminLink.id}
              className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4"
              href={adminLink.to}
            >
              <Image src={adminLink.image} alt="Logo" width={64} height={64} />
              <h3 className="mt-4 font-bold text-sm text-black">
                {adminLink.name}
              </h3>
            </Link>
          );
        })}

      </div>

    </main>
  );
}
