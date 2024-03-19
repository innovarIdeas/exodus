"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  const handleUserSignOut =  () => {
    signOut();
    router.push("/login");
  };

  return (
    <nav className="flex bg-slate-50 justify-between border-b-2 border-gray-300 py-4 px-10 sticky top-0 z-50">

      <Image src="/img/magicwand.png" alt="logo" width={120} height={120} />

      <div className="flex items-center space-x-4">

        {session.status === "unauthenticated" ? (
          <Button
            onClick={() => router.push("/login")}
            className="bg-[#00FF00] text-black hover:bg-[#00CC00] focus:outline-none focus:ring focus:border-[#00FF00]"
          >
          Sign In
          </Button>
        ) : (
          <Button
            onClick={handleUserSignOut}
            className="bg-[#FF0000] text-white hover:bg-[#CC0000] focus:outline-none focus:ring focus:border-[#FF0000]"
          >
          Sign Out
          </Button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
