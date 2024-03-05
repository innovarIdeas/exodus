import React, { useState } from "react";
import UserBookVariantInProgess from "./UserBookVariantInProgess";
import UserBookVariantReadyToPrint from "./UserBookVariantReadyToPrint";

export const UserBookVariantForm = () => {
  const [Category, setCategory] = useState("");

  return (
    <>
      {Category === "" && (
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-xl font-semibold ">
            Select Category
          </h1>
          <div className="flex items-center justify-center gap-6">
            <div
              className="bg-white rounded-lg h-[150px] flex items-center justify-center w-fit p-7 group hover:bg-main mb-8 md:mb-[0px] border border-black hover:border cursor-pointer transition-colors duration-300 ease-in-out"
              onClick={() => setCategory("print")}
            >
              <p className="text-main font-bold text-center group-hover:text-white text-lg">
                Ready to Print
              </p>
            </div>
            <div
              className="bg-white rounded-lg h-[150px] flex items-center justify-center w-fit p-7 group hover:bg-main mb-8 md:mb-[0px] border border-black hover:border cursor-pointer transition-colors duration-300 ease-in-out"
              onClick={() => setCategory("inprogress")}
            >
              <p className="text-main font-bold text-center group-hover:text-white text-lg">
                Work in Progress
              </p>
            </div>
          </div>
        </div>
      )}

      {Category === "print" && <UserBookVariantReadyToPrint />}
      {Category === "inprogress" && <UserBookVariantInProgess />}
    </>
  );
};

export default UserBookVariantForm;
