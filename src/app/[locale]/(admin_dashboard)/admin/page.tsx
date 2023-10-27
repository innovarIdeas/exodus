import { AdminNavLinks } from "@/utils/AdminNavLinks";
import Link from "next/link";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="w-full h-fit bg-main">
      <h1 className="text-[30px] text-center text-white pt-5">
        Categories to explore
      </h1>
      <div className="w-[80%] mx-auto h-fit grid grid-cols-3 gap-[50px] mt-[30px]">
        {AdminNavLinks.map((adminLink) => {
          return (
            <div key={adminLink.id} className="h-fit">
              <Link
                className="bg-white h-[200px] flex items-center justify-center rounded-md"
                href={adminLink.to}
              >
                <img src={adminLink.image} className="h-[100px]" />
              </Link>
              <h1 className="text-2xl text-white text-center mt-2">
                {adminLink.name}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
