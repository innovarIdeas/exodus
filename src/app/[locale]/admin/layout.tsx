"use client";

import Navbar from "@/components/Navbar";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import React from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface adminRouteLayoutProps {
  children: React.ReactNode;
}

const adminRouteLayout: React.FC<adminRouteLayoutProps> = ({ children }) => {
  const session = useSession();
  const path = usePathname();

  if(session.status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      {path !== "/admin" && (
        <NextBreadcrumb
          homeElement={"Home"}
          separator={<span> | </span>}
          activeClasses="text-main"
          containerClasses="flex py-5"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
      )}
      {children}
    </>
  );
};

export default adminRouteLayout;
