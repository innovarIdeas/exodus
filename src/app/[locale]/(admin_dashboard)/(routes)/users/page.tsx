import { columns, user } from "./columns";
import { DataTable } from "@/components/data-table";
import React from "react";

const data: user[] = [
  {
    userId: "12334",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "08148267063",
    type: "customer",
    dateJoined: "June 3rd 2022",
    discount: "XYZ",
  },
  {
    userId: "12334",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "08148267063",
    type: "customer",
    dateJoined: "June 3rd 2022",
    discount: "XYZ",
  },
  {
    userId: "12334",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "08148267063",
    type: "customer",
    dateJoined: "June 3rd 2022",
    discount: "XYZ",
  },
  {
    userId: "12334",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "08148267063",
    type: "customer",
    dateJoined: "June 3rd 2022",
    discount: "XYZ",
  },
];

const page = () => {
  return (
    <div className="mx-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
