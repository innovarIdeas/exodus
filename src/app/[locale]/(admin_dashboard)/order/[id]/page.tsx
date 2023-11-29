"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGetSingleOrder } from "@/lib/hook";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

const SingleInvoice = ()=>{
  const params = useParams();
  const order = useGetSingleOrder(params.id.toLocaleString());
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({ content: () => invoiceRef.current });

  return (

    <>
      <div className="flex gap-4">

        <p><Link href="/dashboard"> Dashboard</Link></p>
        <p>{">"}</p>
        <p className="text-black-200">Invoice</p>

      </div>

      <div className="bg-white rounded-xl border-gray border mt-10   " ref={invoiceRef}>

        <div className=" flex justify-between pt-10 pb-8 px-10 border border-b-gray">
          <div >
            <img className=" w-1/4 lg:w-1/6 mb-2"  src="/img/magicwand.png" />
            <div className=" ">

              <p className="text-xs lg:text-sm mt-1">1, Bamishile Street</p>
              <p className="text-xs lg:text-sm mt-1">Egbeda, Lagos</p>
              <p className="text-xs lg:text-sm mt-1">Nigeria</p>

            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2 text-right ">Invoice</h1>
            <div className="">

              <p className="text-xs lg:text-sm mt-1 text-right">MagicWand Publishing</p>
              <p className="text-xs lg:text-sm mt-1 text-right"> +2348059864322</p>
              <p className="text-xs lg:text-sm mt-1 text-right"> www.booksbymagicwand.com</p>
            </div>
          </div>
        </div>
        <h1 className="mt-[-30px]  text-center text-blue font-bold text-xl">UNPAID     </h1>

        <div className="pt-8  pb-8 px-10 border border-b-gray">

          <p className="text-xs lg:text-sm mt-1 font-bold">Bill To:</p>
          <p className="text-xs lg:text-sm mt-1">{order?.book_variant.book.client?.name}</p>
          <p className="text-xs lg:text-sm mt-1">{order?.book_variant.book.client?.email}</p>
          {/* <p className="text-xs lg:text-sm mt-1">{order?.client.}</p> */}
          {order?.book_variant.ready_to_print ? <div>
            <div className="mt-4">

              <div className="grid grid-cols-5 justify-between border border-b-gray">
                <p className="text-xs lg:text-sm mt-1 ">Items</p>
                <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Description</p>
                <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">Cost</p>
              </div>

              <div className="grid grid-cols-5  justify-between">
                <p className="text-xs lg:text-sm mt-1 ">1</p>
                <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Printing Cost</p>
                <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">200,000</p>
              </div>

              <div className="grid grid-cols-5  justify-between">
                <p className="text-xs lg:text-sm mt-1 ">2</p>
                <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Delivery  Cost</p>
                <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">5,000</p>
              </div>
            </div>

            <div className="grid grid-cols-5  justify-between border border-b-gray">
              <p className="text-xs lg:text-sm mt-1 ">3</p>
              <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Discount</p>
              <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">0.00</p>
            </div>
          </div> : <div>
            <div className="mt-4">

              <div className="grid grid-cols-5 justify-between border border-b-gray">
                <p className="text-xs lg:text-sm mt-1 ">Items</p>
                <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Description</p>
                <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">Cost</p>
              </div>

              <div className="grid grid-cols-5  justify-between">
                <p className="text-xs lg:text-sm mt-1 ">1</p>
                <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Book Design Cost</p>
                <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">20,000</p>
              </div>

              <div className="grid grid-cols-5  justify-between">
                <p className="text-xs lg:text-sm mt-1 ">2</p>
                <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Book Services Cost</p>
                <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">5,000</p>
              </div>
            </div>

            <div className="grid grid-cols-5  justify-between border border-b-gray">
              <p className="text-xs lg:text-sm mt-1 ">3</p>
              <p className="text-xs lg:text-sm mt-1 col-span-2 text-left">Discount</p>
              <p className="text-xs lg:text-sm mt-1 text-right col-span-2 ">0.00</p>
            </div>
          </div> }
          <div className="border border-b-gray">
            <h1 className="text-right mt-4 text-xl font-bold">Total:   <span className="text-blue">{order?.total}</span></h1>
          </div>

          <h1 className="text-center mt-10 mb-5 text-3xl font-bold">Quotation Details</h1>
...
        </div>
      </div>
      <div className="mt-[10px] grid grid-cols-5  md:gap-[5%] bg-white py-5 px-5 rounded-xl shadow">
        <div className="flex gap-2 col-span-2">
          <button className="text-xs lg:text-base bg-white text-blue lg:ml-5" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </>
  );
};

export default SingleInvoice;
