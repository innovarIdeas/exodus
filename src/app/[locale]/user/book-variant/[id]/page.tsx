"use client";

import React, { useState } from "react";
import DashboardTitle from "@/components/DashboardTitle";
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
      <div className="grid grid-cols-2 gap-y-1 my-10 w-[60%] min-w-72 font-semibold">

        <p>Variant Name: </p>
        <p>{bookVariant?.variant_name}</p>

        <p>Status: </p>
        <p>{bookVariant?.status}</p>

        <p>Date of Request: </p>
        <p>{bookVariant?.created_at}</p>

        <p>Paper Type:</p>
        <p>{bookVariant?.paper_type}</p>

        <p>Hard Cover</p>
        <p>{bookVariant?.hard_cover}</p>

        <p>No of Copies: </p>
        <p>{bookVariant?.no_of_books}</p>

        <p>No of Pages:</p>
        <p>{bookVariant?.number_of_pages}</p>

        <p>Book Size: </p>
        <p>{bookVariant?.book_size}</p>

        <p>Project Type:</p>
        <p>{bookVariant?.project_type}</p>

        <p>Pick Up:</p>
        <p>{bookVariant?.pick_up}</p>

        <p>Published:</p>
        <p>{bookVariant?.published}</p>

        <p>Inside Layoout Type:</p>
        <p>{bookVariant?.inside_layout_type}</p>

        <p>Editing:</p>
        <p>{bookVariant?.editing}</p>

        <p>Online Sale:</p>
        <p>{bookVariant?.online_sale}</p>

        <p>Proof Reading:</p>
        <p>{bookVariant?.proof_reading}</p>
      </div>

    </div>
  );
};

export default OrderTemplateDetails;
