"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { DataTable } from "@/components/data-table";
import { IUser } from "@/models/models";
import UserForm from "@/components/UserForm";
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
          <DialogTrigger>

            <button className="rounded-full h-[40px] w-fit bg-main text-white text-x flex items-center justify-center gap-2 cursor-pointer px-4 shadow-lg hover:shadow-none">
              <BiPlusCircle className="text-white text-2xl" />{" "}
              <h1>Add New User</h1>
            </button>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
              Kindly fill the form with your information
              </DialogDescription>
              <UserForm/>
            </DialogHeader>

          </DialogContent>
        </Dialog>

      </div>
      <div>
        <DataTable columns={columns} data={usersData} />
      </div>

    </div>
  );
}
