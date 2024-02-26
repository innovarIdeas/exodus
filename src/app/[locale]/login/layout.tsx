"use client";

import { ChecksUserPermission } from "@/lib/session-manager";
import { PERMISSION_CODES } from "@/lib/permissions-code";
import React from "react";
import { redirect } from "next/navigation";

interface adminRouteLayoutProps {
  children: React.ReactNode;
}

const adminRouteLayout: React.FC<adminRouteLayoutProps> = ({ children }) => {
  if(ChecksUserPermission(PERMISSION_CODES.ADMIN)) {
    redirect("/admin");
  }else if(ChecksUserPermission(PERMISSION_CODES.CLIENT)) {
    redirect("/user");
  }

  return (
    <>

      {children}
    </>
  );
};

export default adminRouteLayout;
