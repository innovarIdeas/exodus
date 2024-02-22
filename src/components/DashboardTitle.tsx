import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

const DashboardTitle = (props: Props) => {
  return (
    <h2 className={cn("text-2xl font-semibold", props.className)}>
      {props.title}
    </h2>
  );
};

export default DashboardTitle;
