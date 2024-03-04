import { Button } from "./ui/button";
import { IOrder } from "@/models/models";
import React from "react";
import { payWithPayStack } from "@/lib/api-call";

interface PayStackOrderPaymentProp {
  order: IOrder;
}

export function PayStackOrderPayment ({ order }: PayStackOrderPaymentProp) {
  const onSubmit = async () =>{
    await payWithPayStack(order.created_by_user?.email, order.total, order.id);
  };

  return(
    <Button onClick={()=>onSubmit()} className="active-button"> Pay Now{order.book_cost}</Button>
  );
}
