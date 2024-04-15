"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import CreateOrder from "@/components/CreateOrder";
import DashboardTitle from "@/components/DashboardTitle";
import FormatDate from "@/components/FormatDate";
import { IBookVariant } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { getBookVariant } from "@/lib/api-call";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const OrderTemplateDetails = () => {
  const params = useParams() as { id: string };
  const [bookVariant, setBookVariant] = useState<IBookVariant>();

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_SINGLE_BOOK],
    queryFn: async () => {
      if (!params.id) return;
      const { data, error, validationErrors } = await getBookVariant(params.id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.error(error);

        return;
      }

      if (data) {
        setBookVariant(data);
      }

      return data;
    },
  });

  if(isLoading) {
    return (
      <div className="flex justify-center mt-10 font-semibold text-lg"><p>Loading....</p></div>
    );
  }

  return (
    <div className="ml-6">
      <div className="mb-10">
        <DashboardTitle title="Order Template Details" />
      </div>
      {bookVariant !== undefined && bookVariant?.status === "Ready to Print" ? <div className="grid grid-cols-2 gap-y-1 my-10 w-[60%] min-w-72 font-semibold">

        <p>Book Title: </p>
        <p>{bookVariant?.book.title}</p>

        <p>Author: </p>
        <p>{bookVariant?.book.author}</p>

        <p>Status: </p>
        <p>{bookVariant?.status}</p>

        <p>Date of Request: </p>
        <p> <FormatDate date={bookVariant?.created_at} /> </p>

        <p>Paper Type:</p>
        <p>{bookVariant?.paper_type}</p>

        <p>No of Copies: </p>
        <p>{bookVariant?.no_of_books}</p>

        <p>No of Pages:</p>
        <p>{bookVariant?.number_of_pages}</p>

        <p>Book Size: </p>
        <p>{bookVariant?.book_size}</p>

        <p>Published:</p>
        <p>{bookVariant?.published ? "True" : "False"}</p>

        <p>Layout Type:</p>
        <p>{bookVariant?.inside_layout_type}</p>

        <p>Paper Size:</p>
        <p>{bookVariant?.book_size}</p>

        <p>No of Books:</p>
        <p>{bookVariant?.no_of_books}</p>

        <p>Binding:</p>
        <p>{bookVariant?.binding}</p>

        <p>ISBN:</p>
        <p>{bookVariant?.ISBN ? "True" : "False"}</p>

        <p>Embossing:</p>
        <p>{bookVariant?.embossing ? "True" : "False"}</p>

        <p>Foiling:</p>
        <p>{bookVariant?.foiling ? "True" : "False"}</p>

        <p>Lamination:</p>
        <p>{bookVariant?.lamination}</p>
      </div> :
        bookVariant !== undefined &&
        <div className="grid grid-cols-2 gap-y-1 my-10 w-[60%] min-w-72 font-semibold">

          <p>Book Title: </p>
          <p>{bookVariant?.book.title}</p>

          <p>Author: </p>
          <p>{bookVariant?.book.author}</p>

          <p>Status: </p>
          <p>{bookVariant?.status}</p>

          <p>Date of Request: </p>
          <p> <FormatDate date={bookVariant.created_at} /> </p>

          <p>Book Format:</p>
          <p>{bookVariant?.current_book_format}</p>

          <p>No of Words: </p>
          <p>{bookVariant?.number_of_words}</p>

          <p>Book Size: </p>
          <p>{bookVariant?.book_size}</p>

          <p>Editing:</p>
          <p>{bookVariant?.editing ? "True" : "False"}</p>

          <p>ISBN:</p>
          <p>{bookVariant?.ISBN ? "True" : "False"}</p>

          <p>Proof Reading:</p>
          <p>{bookVariant?.proof_reading ? "True" : "False"}</p>

          <p>Layout Type:</p>
          <p>{bookVariant?.inside_layout_type}</p>

          <p>Cover Design:</p>
          <p>{bookVariant?.cover_design}</p>

          <p>Online Sales:</p>
          <p>{bookVariant?.online_sale}</p>
        </div>
      }

      <div className="mb-6">
        {bookVariant &&
        <Dialog>
          <DialogTrigger className="rounded-sm h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <span className="text-white">Place Order</span>
          </DialogTrigger>
          <DialogContent className="w-1/2 overflow-auto">
            <DialogHeader>
              <DialogTitle>Place Order</DialogTitle>
              <DialogDescription>
                  Are you sure you want to plqce this order?
              </DialogDescription>
              <CreateOrder book_variant_id={bookVariant?.id} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        }
      </div>

    </div>
  );
};

export default OrderTemplateDetails;
