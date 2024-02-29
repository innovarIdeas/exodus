"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import ClientForm from "@/components/ClientForm";
import { IUser } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import { getAllClients } from "@/lib/api-call";
import { useQuery } from "@tanstack/react-query";

export default function UserBody () {
  const [usersData, setUsersData] = useState<IUser[]>([]);

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PULISHERS],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllClients();

      if(data) setUsersData(data);

      if(validationErrors?.length) {
        console.error(validationErrors);
      }

      if (error) {
        console.error(error);
      }
    }
  });

  return(
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">

        <Dialog>
          <DialogTrigger className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
            <BiPlusCircle className="text-white text-2xl" />{" "}
            <span className="text-white">Add New Client</span>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Client</DialogTitle>
              <DialogDescription>
              Kindly fill the form with your information
              </DialogDescription>
              <ClientForm/>
            </DialogHeader>

          </DialogContent>
        </Dialog>

      </div>
      <div>
        <UserDataTable columns={columns} data={usersData} />
      </div>

    </div>
  );
}
