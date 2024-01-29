"use client";

import { Button } from "./ui/button";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full h-[90px] flex items-center justify-between p-5 shadow-md">
      <img src="/img/magicwand.png" className="h-[60px]" />
      <Button className="bg-white hover:bg-white  text-black active:font-bold rounded-full  font-semibold" onClick={() => {signOut();
        router.push("/");}}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
