"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent,  SheetTrigger } from "@/components/ui/sheet";
import AddNewUser from "@/components/AddNewUser";
import { Button } from "@/components/ui/button";
import { IUser } from "@/models/models";
import Link from "next/link";
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
      <div>
        <h1 className="text-3xl font-semibold text-black">User Management</h1>
        <div className="flex items-center space-x-4 my-4">
          <Link href="/users/roles" className="text-main border border-main rounded-lg text-md py-1 px-3 hover:bg-main hover:text-white">
                Manage Roles
          </Link>

          <Link href="/users/permissions" className="text-main border border-main rounded-lg text-md py-1 px-3 hover:bg-main hover:text-white">
                 View Permissions
          </Link>
        </div>

      </div>
      <div className="flex justify-end items-end float-right mx-5 my-5">

        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">Add New User</Button>
          </SheetTrigger>

          <SheetContent className="w-2/3 sm:w-full">

            <AddNewUser/>
          </SheetContent>
        </Sheet>

      </div>
      <div>
        <UserDataTable columns={columns} data={usersData} />
      </div>

    </div>
  );
}
