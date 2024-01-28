"use client";

import { ContextProvider } from "@/context/ContextStore";
import { NavBar } from "./navbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ContextProvider>
        <NavBar />
        {children}
      </ContextProvider>
    </div>
  );
};

export default layout;
