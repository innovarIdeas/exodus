import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookBody from "./order-templates/body";
import OrderBody from "./body";
import React from "react";

const page = () => {
  return (
    <div className="mx-5 w-screen px-5">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="order-templates">Order Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <OrderBody/>
        </TabsContent>
        <TabsContent value="order-templates">
          <BookBody/>
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default page;
