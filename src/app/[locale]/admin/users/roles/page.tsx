
import { DataTable } from "./data-table";
import React from "react";
import { columns } from "./column";
import { getAllRoles } from "@/lib/api-call";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Client () {
  const session = await getServerSession(options);
  const { data, error, validationErrors } = await getAllRoles();

  if (validationErrors?.length) {
    console.error(validationErrors);

    return;
  }

  if (error) {
    console.error(error);

    return;
  }

  if (!data) return;

  if (!session) {
    redirect("/");
  } else {
    return (
      <main className="w-screen h-screen flex flex-col bg-white">

        <div className={"flex flex-col justify-between"}>
          <div>
            <DataTable columns={columns} data={data}/>
          </div>
        </div>

      </main>
    );
  }
}
