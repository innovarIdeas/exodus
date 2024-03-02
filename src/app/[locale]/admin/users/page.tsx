import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientBody from "./ClientBody";
import Link from "next/link";
import PublisherBody from "./PublisherBody";
import React from "react";
import StaffBody from "./StaffBody";
import UserBody from "./body";
import { getPermissions } from "@/lib/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);
  const permissions = await getPermissions(session);

  if (!permissions.length) {
    return (
      <main className="flex flex-col items-center p-5">
        You are not authorized to view this page. Please login. <br />
        <Link href="/" className="bg-primary text-white py-2 px-3.5 my-3">
          Go to login page
        </Link>
      </main>
    );
  }

  return (
    <div className="mx-5 w-screen px-5">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="publishers">Publishers</TabsTrigger>
          <TabsTrigger value="staffs">Staffs</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <UserBody />
        </TabsContent>
        <TabsContent value="clients">
          <ClientBody />
        </TabsContent>
        <TabsContent value="publishers">
          <PublisherBody />
        </TabsContent>
        <TabsContent value="staffs">
          <StaffBody />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
