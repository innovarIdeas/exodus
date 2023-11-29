"use client";

import { Button } from "./ui/button";
import React from "react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="w-full h-[90px] flex items-center justify-between p-5 shadow-md">
      <img src="/img/magicwand.png" className="h-[60px]" />
      <Button className="bg-red text-white rounded-full h-[50px] w-[12%] font-semibold" onClick={() => signOut()}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
