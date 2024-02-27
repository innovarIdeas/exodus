"use client";

import { ContextProvider } from "@/context/ContextStore";
import Navbar from "@/components/Navbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ContextProvider>
        <Navbar/>
        {children}
      </ContextProvider>
    </div>
  );
};

export default layout;
