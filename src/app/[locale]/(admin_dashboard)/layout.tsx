"use client";

import NextBreadcrumb from "@/components/NextBreadcrumb";
import React from "react";
import TopBar from "@/components/TopBar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  const path = usePathname();

  return (
    <>
      <TopBar />
      {path !== "/admin" && <NextBreadcrumb
        homeElement={"Home"}
        separator={<span> | </span>}
        activeClasses="text-main"
        containerClasses="flex py-5"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />}

      {children}
    </>
  );
};

export default layout;
