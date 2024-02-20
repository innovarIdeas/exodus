"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ChecksUserPermission } from "@/lib/session-manager";
import Image from "next/image";
import { PERMISSION_CODES } from "@/lib/permissions-code";
import React from "react";
import { useRouter } from "next/navigation";

export const NavBar = ()=>{
  const router = useRouter();
  const session = useSession();

  return (
    <nav className="flex bg-slate-50 justify-between border-b-2 border-gray-300 py-4 px-10 sticky top-0 z-50">

      <Image src="/img/magicwand.png" alt="logo" width={120} height={120} />

      <div className="flex items-center space-x-4">

        {session.status === "authenticated" && (
          <Button
            onClick={() =>{
              if(ChecksUserPermission(PERMISSION_CODES.CLIENT)) {
                router.push("/user");
              }else  {
                router.push("/admin");
              }
            }
            }
            className="bg-[#3366CC] text-white hover:bg-[#254785] focus:outline-none focus:ring focus:border-[#3366CC]"
          >
        Go to Dashboard
          </Button>
        )}

        {session.status === "unauthenticated" ? (
          <Button
            onClick={() => router.push("/login")}
            className="bg-[#00FF00] text-black hover:bg-[#00CC00] focus:outline-none focus:ring focus:border-[#00FF00]"
          >
          Sign In
          </Button>
        ) : (
          <Button
            onClick={() => signOut()}
            className="bg-[#FF0000] text-white hover:bg-[#CC0000] focus:outline-none focus:ring focus:border-[#FF0000]"
          >
          Sign Out
          </Button>
        )}

      </div>
    </nav>
  );
};
