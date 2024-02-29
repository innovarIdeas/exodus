"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddNewConstant from "@/components/AddNewConstant";
import { Button } from "@/components/ui/button";
import { ConstantDataTable } from "./data-table";
import { IConstant } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { columns } from "./columns";
import { getAllConstants } from "@/lib/api-call";
import { useQuery } from "@tanstack/react-query";

export default function ConstantBody () {
  const [constantData, setConstantData] = useState<IConstant[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CONSTANTS],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllConstants();

      if(data) setConstantData(data);

      if(validationErrors?.length) {
        console.error(validationErrors);

        return;
      }

      if (error) {
        console.error(error);

        return;
      }
    }
  });

  return (
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">
              Add New Constant
            </Button>
          </SheetTrigger>

          <SheetContent className="w-2/3 sm:w-full">
            <AddNewConstant />
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <ConstantDataTable columns={columns} data={constantData} />
      </div>
    </div>
  );
}
