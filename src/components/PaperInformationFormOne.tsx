"use client";

import React, { useContext } from "react";
import { ContextStore } from "@/context/ContextStore";
import Image from "next/image";

interface FormOneProps {
  setForm1: React.Dispatch<React.SetStateAction<boolean>>;
  setForm2: React.Dispatch<React.SetStateAction<boolean>>;
  setForm3: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaperInformationFormOne = (props: FormOneProps) => {
  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const { setWhitePaper, whitePaper, creamPaper, glossyPaper, setCreamPaper, setGlossyPaper, setNewsPrint, newsPrint } = contextValues;

  const handleWhitePaper = ()=>{
    setWhitePaper(true);
    setCreamPaper(false);
    setGlossyPaper(false);
    setNewsPrint(false);

    setTimeout(() => {
      props.setForm1(false);
      props.setForm2(true);
      props.setForm3(false);
    }, 1000);
  };

  const handleCreamPaper = ()=>{
    setWhitePaper(false);
    setCreamPaper(true);
    setGlossyPaper(false);
    setNewsPrint(false);

    setTimeout(() => {
      props.setForm1(false);
      props.setForm2(true);
      props.setForm3(false);
    }, 1000);
    console.log("Cream was clicked");
  };

  const handleGlossyPaper = ()=>{
    setWhitePaper(false);
    setCreamPaper(false);
    setGlossyPaper(true);
    setNewsPrint(false);

    setTimeout(() => {
      props.setForm1(false);
      props.setForm2(true);
      props.setForm3(false);
    }, 1000);
  };

  const handleNewsPrint = ()=>{
    setWhitePaper(false);
    setCreamPaper(false);
    setGlossyPaper(false);
    setNewsPrint(true);

    setTimeout(() => {
      props.setForm1(false);
      props.setForm2(true);
      props.setForm3(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mt-6 flex flex-col gap-4">
          <div onClick={()=>handleWhitePaper()} className="border flex justify-between items-center w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md hover:bg-slate-50">
            <div className="flex items-center gap-6">
              <input checked={whitePaper} type="checkbox" name="" id="" />
              <p className="text-lg">White</p>
            </div>
            <p className="flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300">?</p>
          </div>
          <div onClick={()=>handleCreamPaper()} className="border flex justify-between items-center w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md hover:bg-slate-50">
            <div className="flex items-center gap-6">
              <input checked={creamPaper} type="checkbox" name="" id="" />
              <p className="text-lg">Cream</p>
            </div>
            <p className="flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300">?</p>
          </div>
          <div onClick={()=>handleGlossyPaper()} className="border flex justify-between items-center w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md hover:bg-slate-50">
            <div className="flex items-center gap-6">
              <input checked={glossyPaper} type="checkbox" name="" id="" />
              <p className="text-lg">Glossy (135 grms)</p>
            </div>
            <p className="flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300">?</p>
          </div>
          <div onClick={()=>handleNewsPrint()} className="border flex justify-between items-center w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md">
            <div className="flex items-center gap-6">
              <input checked={newsPrint} type="checkbox" name="" id="" />
              <p className="text-lg">New Print</p>
            </div>
            <p className="flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300">?</p>
          </div>
        </div>

        <Image src="/img/bookshelff.png" alt="form-img" width={350} height={200} />

      </div>
    </div>
  );
};

export default PaperInformationFormOne;
