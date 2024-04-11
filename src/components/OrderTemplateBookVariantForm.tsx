import { IBookVariant } from "@/models/models";
import React from "react";
import UserBookVariantInProgess from "./UserBookVariantInProgess";
import UserBookVariantReadyToPrint from "./UserBookVariantReadyToPrint";

interface PropType {
  data: IBookVariant[];
}

export const OrderTemplateBookVariantForm = (props: PropType) => {
  return (
    <>
      {props.data[0].status === "READY_TO_PRINT" ? <UserBookVariantReadyToPrint />
        :
        props.data[0].status === "WORK_IN_PROGRESS" && <UserBookVariantInProgess />}

    </>
  );
};

export default OrderTemplateBookVariantForm;
