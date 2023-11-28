"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import ClientForm from "@/components/UserForm";
import { IUser } from "@/models/models";
import { UserDataTable } from "./data-table";
import { columns } from "./columns";
import { getAllUsers } from "@/lib/api-call";

export default function UserBody () {
  const [usersData, setUsersData] = useState<IUser[]>([]);

  const fetchData = async ()=>{
    const { data, error, validationErrors } = await getAllUsers();

    if (data) setUsersData(data);

    if (validationErrors?.length) {
      console.error(validationErrors);

      return;
    }

    if (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData();
  }, [fetchData]);

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
