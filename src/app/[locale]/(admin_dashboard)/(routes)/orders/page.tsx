import Link from "next/link";
import OrderBody from "./body";
import React from "react";

const page = () => {
  return (
    <div className="mx-5">
      <Link href="/orders/book-variant" className="m-5 rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
        Check Book Variants
      </Link>
      <OrderBody/>
    </div>
  );
};

export default page;
