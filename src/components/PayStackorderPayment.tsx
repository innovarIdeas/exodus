import { IOrder } from "@/models/models";
import { PaystackButton } from "react-paystack";
import React from "react";
import { createTransactionTrigger } from "@/lib/hook";

interface PayStackOrderPaymentProp {
  order: IOrder;
}

export function PayStackOrderPayment ({ order }: PayStackOrderPaymentProp) {
  const paystackProps = {
    email: order.client.email,
    amount: order.total,
    custom_fields: {
      name: order.client.name,
      phone: order.client.email,
      reference: createTransactionTrigger(order)
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    text: "Pay Now",
    onSuccess: () =>{
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Payment Cancelled"),
  };

  return(
    <PaystackButton {...paystackProps} />
  );
}
