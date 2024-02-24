"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="h-screen">
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="flex h-[85%]">
        <div className="h-[85%] fixed">
          <SideBar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
        </div>
        <div className={`w-full ${isCollapsed ? "ml-16 xl:ml-20" : "ml-16 md:ml-44"} p-8`}>{children}</div>
      </div>
    </div>
  );
};

export default layout;
