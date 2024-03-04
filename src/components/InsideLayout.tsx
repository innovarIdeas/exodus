"use client";

import React, { useContext } from "react";
import { ContextStore } from "@/context/ContextStore";

const InsideLayout = () => {
  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const { artIllustration, setArtIllustration, artIllustrationType, setArtIllustrationType, insideLayout, setInsideLayout, insideLayoutType, setInsideLayoutType } = contextValues;

  return (
    <div className="h-full">
      <div>
        <h2 className="text-4xl font-semibold my-5">Inside Layout</h2>
        <div className="grid md:grid-cols-2 gap-y-10 my-8 h-full md:mb-56">

          <div className="flex flex-col gap-2">
            <div>
              <p>Do You Require Inside Layout Design?</p>
              <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
                <button onClick={()=>setInsideLayout(true)} className={`py-3 rounded-lg ${insideLayout ? "bg-main text-white" : ""}`}>Yes</button>
                <button onClick={()=>setInsideLayout(false)} className={`py-3 rounded-lg ${!insideLayout ? "bg-main text-white" : ""}`}>No</button>
              </div>
            </div>
            {insideLayout &&
            <div>
              <p>Please choose an option</p>
              <select value={insideLayoutType} onChange={(e)=>setInsideLayoutType(e.target.value)} name="" id="" className="border shadow-md p-2 rounded-md bg-white border-gray-400">
                <option value="">--Please select an option--</option>
                <option value="Poetry Layout">Poetry Layout</option>
                <option value="Poetry with Pictures">Poetry with Pictures</option>
                <option value="Simple fiction/non-fiction layout (no graphics or image)">Simple fiction/non-fiction layout (no graphics or image)</option>
                <option value="Fiction/non-fiction layout with pictures, Graphic and charts">Fiction/non-fiction layout with pictures, Graphic and charts</option>
                <option value="Comic">Comic</option>
              </select>
            </div>}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <p>Do You Require Custom Illustration in Your Work?</p>
              <div className="w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400">
                <button onClick={()=>setArtIllustration(true)} className={`py-3 rounded-lg ${artIllustration ? "bg-main text-white" : ""}`}>Yes</button>
                <button onClick={()=>setArtIllustration(false)} className={`py-3 rounded-lg ${!artIllustration ? "bg-main text-white" : ""}`}>No</button>
              </div>
            </div>
            {artIllustration &&
            <div>
              <p>Please choose an option</p>
              <select value={artIllustrationType} onChange={(e)=>setArtIllustrationType(e.target.value)} name="" id="" className="border shadow-md p-2 rounded-md bg-white border-gray-400">
                <option value="">--Please select an option--</option>
                <option value="Simple black and white sketch/inking">Simple black and white sketch/inking</option>
                <option value="Full color flat 2D illustration (Children and young Adult style)">Full color flat 2D illustration (Children and young Adult style)</option>
                <option value="Full color 3D illustration (Adult comic book style)">Full color 3D illustration (Adult comic book style)</option>
                <option value="Comic">Comic</option>
              </select>
            </div>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsideLayout;
