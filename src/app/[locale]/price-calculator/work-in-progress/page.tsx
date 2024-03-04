"use client";

import React, { useContext } from "react";
import BookInfo from "@/components/BookInfo";
import BookService from "@/components/BookService";
import ConfirmOrder from "@/components/ConfirmOrder";
import { ContextStore } from "@/context/ContextStore";
import InsideLayout from "@/components/InsideLayout";

const WorkInProgress = () => {
  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const {  currentStep } = contextValues;

  return (
    <div style={{ backgroundImage: "url(\"/img/bg_light.png\")" }} className="lg:ml-[20%] px-6 md:px-24 pt-10 h-full overflow-hidden">
      <div className="flex mx-auto bg-white py-6 px-8 mt-24 lg:mt-auto shadow-lg gap-5">
        <p>Project Name: </p>
        <p>Project Type: </p>
        <p>Project Readiness: </p>
      </div>

      {currentStep === 1 && <BookInfo />}
      {currentStep === 2 && <BookService />}
      {currentStep === 3 && <InsideLayout />}
      {currentStep === 4 && <ConfirmOrder />}

    </div>
  );
};

export default WorkInProgress;
