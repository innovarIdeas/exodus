"use client";

import React, { useContext } from "react";
import { ContextStore } from "@/context/ContextStore";

const BookPageInfo = () => {
  // const [potrait, setPotrait] = useState(false)

  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const { noOfPages, setNoOfPages, bookSize, setBookSize, potrait, setPotrait, noOfBooks, setNoOfBooks } = contextValues;

  return (
    <div>
      <div>
        <h2 className="text-4xl font-semibold my-5">Book Page Information</h2>

        <div className="flex flex-col gap-1 text-gray-600 my-7">
          <label htmlFor="no_of_page" className="">Number of Page</label>
          <input onChange={(e)=>setNoOfPages(parseInt(e.target.value, 10))} value={noOfPages} className="w-80 p-2 shadow-md border border-gray-400 rounded-lg outline-blue-800" type="number" id="no_of_page" />
        </div>
        <div className="my-7">
          <p className="font-bold mb-2">What layout style do you want?</p>
          <div className="w-[500px] grid grid-cols-2 border p-2 px-4 bg-white rounded-lg">
            <button onClick={()=>setPotrait(true)} className={`py-2.5 rounded-xl ${potrait ? "bg-blue-800 text-white" : ""}`}>Potrait</button>
            <button onClick={()=>setPotrait(false)} className={`py-2.5 rounded-xl ${potrait ? "" : "bg-blue-800 text-white"}`}>Landscape</button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Select Book Size in Inches</h2>
          <p>Please note the A6, A5 and A4 are all trimmed variations</p>

          <div className="w-[100%] overflow-x-scroll bg-blue-100">
            {potrait ?
              <div className="bg-blue-100 flex items-end  w-[120%] h-[220px] gap-5 pb-10 px-5">

                <div onClick={()=>setBookSize("A6")} className={`w-[60%] relative bg-white shadow h-[30%] hover:shadow-xl ${bookSize == "A6" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">A6</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray" />

                </div>

                <div onClick={()=>setBookSize("5x8")} className={`w-[70%] relative bg-white shadow h-[42%] col-span-6 hover:shadow-xl ${bookSize == "5x8" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">5x8</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>

                <div onClick={()=>setBookSize("A5")} className={`w-[80%] relative bg-white shadow h-[45%] col-span-8 hover:shadow-xl ${bookSize == "A5" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">A5</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>

                <div onClick={()=>setBookSize("5.5x8.5")} className={`w-[90%] relative bg-white shadow h-[50%] col-span-7 hover:shadow-xl ${bookSize == "5.5x8.5" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">5.5x8.5 </h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
                <div onClick={()=>setBookSize("6x9")} className={`w-[100%] relative bg-white shadow h-[60%] col-span-9 hover:shadow-xl ${bookSize == "6x9" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">6x9</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
                <div onClick={()=>setBookSize("7x10")} className={`w-[110%] relative bg-white shadow h-[70%] col-span-10 hover:shadow-xl ${bookSize == "7x10" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">7x10</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
                <div onClick={()=>setBookSize("A4")} className={`w-[120%] relative bg-white shadow h-[80%] col-span-12 hover:shadow-xl ${bookSize == "A4" && potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">A4</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
              </div> :
              <div className="bg-blue-100 flex w-[120%] h-[220px] gap-5 pb-10  items-end px-5">

                <div onClick={()=>setBookSize("A6")} className={`w-[60%] relative bg-white shadow h-[15%] hover:shadow-xl ${bookSize == "A6" && !potrait ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">A6</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>

                </div>

                <div onClick={()=>setBookSize("5x8")} className={`w-[70%] relative bg-white shadow h-[25%] hover:shadow-xl ${bookSize == "5x8" ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">5x8</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>

                <div onClick={()=>setBookSize("A5")} className={`w-[80%] relative bg-white shadow h-[30%] hover:shadow-xl ${bookSize == "A5" ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">A5</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>

                <div onClick={()=>setBookSize("5.5x8.5")} className={`w-[90%] relative bg-white shadow h-[35%]  hover:shadow-xl ${bookSize == "5.5x8.5" ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">5.5x8.5 </h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
                <div onClick={()=>setBookSize("6x9")} className={`w-[100%] relative bg-white shadow h-[40%]  hover:shadow-xl ${bookSize == "6x9" ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">6x9</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
                <div onClick={()=>setBookSize("7x10")} className={`w-[110%] relative bg-white shadow h-[45%]  hover:shadow-xl ${bookSize == "7x10" ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">7x10</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
                <div onClick={()=>setBookSize("A4")} className={`w-[120%] relative bg-white shadow h-[55%]  hover:shadow-xl ${bookSize == "A4" ? "border-2 border-blue-400" : ""} cursor-pointer`}>
                  <h1 className="absolute left-0 top-[-5%]">A4</h1>
                  <div className="w-0.5 h-full absolute top-0 left-[50%] border-l border-l-gray"></div>
                </div>
              </div>}
          </div>
        </div>

        <div className="flex flex-col gap-2 my-8">
          <p className="text-gray-600">How many books are you printing?</p>
          <input onChange={(e)=>setNoOfBooks(parseInt(e.target.value, 10))} value={noOfBooks} type="number" className="w-80 p-2 shadow-md border border-gray-400 rounded-md" />
          <p className="text-gray-600">Quantities available (50units and above)</p>
        </div>

      </div>
    </div>
  );
};

export default BookPageInfo;
