"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { PayStackOrderPayment } from "@/components/PayStackorderPayment";
// import { TailSpin } from "react-loader-spinner";
import { useGetSingleOrder } from "@/lib/hook";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

const SingleInvoice = ()=>{
  const params = useParams();
  const { data: order, isLoading } = useGetSingleOrder(params.id.toLocaleString());
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({ content: () => invoiceRef.current });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <TailSpin
          visible={true}
          height="70"
          width="70"
          color="#3E4095"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        /> */}
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4">
        <p>
          <Link href="/dashboard"> Dashboard</Link>
        </p>
        <p>{">"}</p>
        <p className="text-black-200">Invoice</p>
      </div>

      <div
        className="bg-white rounded-xl border-gray border mt-10   "
        ref={invoiceRef}
      >
        <div className=" flex justify-between pt-10 pb-8 px-10 border border-b-gray">
          <div>
            <img className=" w-1/4 lg:w-1/6 mb-2" src="/img/magicwand.png" />
            <div className=" ">
              <p className="text-xs lg:text-sm mt-1">1, Bamishile Street</p>
              <p className="text-xs lg:text-sm mt-1">Egbeda, Lagos</p>
              <p className="text-xs lg:text-sm mt-1">Nigeria</p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2 text-right ">Invoice</h1>
            <div className="">
              <p className="text-xs lg:text-sm mt-1 text-right">
                MagicWand Publishing
              </p>
              <p className="text-xs lg:text-sm mt-1 text-right">
                {" "}
                +2348059864322
              </p>
              <p className="text-xs lg:text-sm mt-1 text-right">
                {" "}
                www.booksbymagicwand.com
              </p>
            </div>
          </div>
        </div>
        <h1 className="mt-[-30px]  text-center text-blue font-bold text-xl">
          {order?.status}
        </h1>

        <div className="pt-8  pb-8 px-10 border border-b-gray">
          <p className="text-xs lg:text-sm mt-1 font-bold">Bill To:</p>
          <p className="text-xs lg:text-sm mt-1">
            {order?.book_variant.book.client?.name}
          </p>
          <p className="text-xs lg:text-sm mt-1">
            {order?.book_variant.book.client?.email}
          </p>
          <div>
            <div className="mt-4">
              <table className="w-full border-collapse border border-b-gray">
                <thead>
                  <tr>
                    <th className="text-xs lg:text-sm py-1 px-2 col-span-2 text-left">
                      Items
                    </th>
                    <th className="text-xs lg:text-sm py-1 px-2 text-left">
                      Quantity
                    </th>
                    <th className="text-xs lg:text-sm py-1 px-2 text-left">
                      Price
                    </th>
                    <th className="text-xs lg:text-sm py-1 px-2 text-right col-span-2">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-xs lg:text-sm py-1 px-2 col-span-2">
                      <span className="font-semibold">
                        {" "}
                        {order?.book?.title}
                      </span>
                      <br />
                      <span>
                        {order?.book_variant?.number_of_pages} pages,{" "}
                        {order?.book_variant?.book_size} size,
                        {order?.book_variant?.paper_type},{" "}
                        {order?.book_variant?.lamination}
                      </span>
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-left">
                      {order?.book_variant?.no_of_books}
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-left col-span-2">
                      {order?.total && order?.book_variant?.no_of_books
                        ? order.total / order.book_variant.no_of_books
                        : "N/A"}
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-right col-span-2">
                      {order &&
                        new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(order.total)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xs lg:text-sm py-1 px-2">
                      <span className="font-semibold">
                        Flexi Plan Service Charge
                      </span>{" "}
                      <br />
                      <span>Exemption for over N100,000 print</span>
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 col-span-2 text-left">
                      0.00
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-left col-span-2">
                      0.00
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-right col-span-2">
                      0.00
                    </td>
                  </tr>
                  <tr>
                    <td className="text-xs lg:text-sm py-1 px-2">
                      <span className="font-semibold">Book covr embossing</span>{" "}
                      <br />
                      <span>
                        Cover embossing for {order?.book?.title} (100 copies)
                      </span>
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 col-span-2 text-left">
                      0.00
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-left col-span-2">
                      0.00
                    </td>
                    <td className="text-xs lg:text-sm py-1 px-2 text-right`~~~~ col-span-2">
                      0.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="border border-b-gray">
            <h1 className="text-right mt-4 text-xl font-bold">
              Total:{" "}
              <span className="text-blue">
                {" "}
                {order &&
                  new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(order.total)}
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-[10px] grid grid-cols-5  md:gap-[5%] bg-white py-5 px-5 rounded-xl shadow">
        <div className="flex gap-2 col-span-2">
          <button
            className="text-xs lg:text-base bg-white text-blue lg:ml-5"
            onClick={handlePrint}
          >
            Print
          </button>
          {order && <PayStackOrderPayment order={order} />}
        </div>
      </div>
    </>
  );
};

export default SingleInvoice;
