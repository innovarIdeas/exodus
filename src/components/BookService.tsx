"use client";

import React, { useContext } from "react";
import { ContextStore } from "@/context/ContextStore";

const BookService = () => {
  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const { isbn, setIsbn, editing, setEditing, proofReading, setProofReading, onlineSales, setOnlineSales, coverDesign, setCoverDesign, coverDesignType, setCoverDesignType } = contextValues;

  return (
    <div>
      <div>
        <h2 className="text-4xl font-semibold my-5">Service</h2>
        <div className="grid md:grid-cols-2 gap-y-10 my-8">
          <div>
            <p>Editing</p>
            <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
              <button onClick={()=>(setEditing(true))} className={`py-3  rounded-lg ${editing ? "bg-main text-white" : ""}`}>Yes</button>
              <button onClick={()=>(setEditing(false))} className={`py-3 rounded-lg ${!editing ? "bg-main text-white" : ""}`}>No</button>
            </div>
          </div>
          <div>
            <p>ISBN</p>
            <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
              <button onClick={()=>setIsbn(true)} className={`py-3 rounded-lg ${isbn ? "bg-main text-white" : ""}`}>Yes</button>
              <button onClick={()=>setIsbn(false)} className={`py-3 rounded-lg ${!isbn ? "bg-main text-white" : ""}`}>No</button>
            </div>
          </div>
          <div>
            <p>Proof Reading</p>
            <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
              <button onClick={()=>setProofReading(true)} className={`py-3 rounded-lg ${proofReading ? "bg-main text-white" : ""}`}>Yes</button>
              <button onClick={()=>setProofReading(false)} className={`py-3 rounded-lg ${!proofReading ? "bg-main text-white" : ""}`}>No</button>
            </div>
          </div>
          <div>
            <p>Online Sales (Amazon)</p>
            <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
              <button onClick={()=>setOnlineSales(true)} className={`py-3 rounded-lg ${onlineSales ? "bg-main text-white" : ""}`}>Yes</button>
              <button onClick={()=>setOnlineSales(false)} className={`py-3 rounded-lg ${!onlineSales ? "bg-main text-white" : ""}`}>No</button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p>Do You Require Cover Design?</p>
              <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
                <button onClick={()=>setCoverDesign(true)} className={`py-3 rounded-lg ${coverDesign ? "bg-main text-white" : ""}`}>Yes</button>
                <button onClick={()=>setCoverDesign(false)} className={`py-3 rounded-lg ${!coverDesign ? "bg-main text-white" : ""}`}>No</button>
              </div>
            </div>
            {coverDesign &&
            <div>
              <p>Please choose an option</p>
              <select value={coverDesignType} onChange={(e)=>setCoverDesignType(e.target.value)} name="" id="" className="border shadow-md p-2 rounded-md bg-white border-gray-400">
                <option value="">--Please select an option--</option>
                <option value="Graphics-with-online-images-or-author-supplied-image">Graphics with online images/author supplied image</option>
                <option value="Graphics-with-premium-paid-image">Graphics with premium paid image</option>
                <option value="Artist-Illustrated">Artist Illustrated</option>
              </select>
            </div>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookService;
