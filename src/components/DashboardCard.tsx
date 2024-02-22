import { LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  total: number | undefined;
  description: string;
};

export const DashboardCard = (props: CardProps) => {
  return (
    <CardContent>
      <section className="flex text items-center justify-between gap-2">
        <p className="text-sm">{props.label}</p>
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{props.total}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>

    </CardContent>
  );
};

export const CardContent = (props: React.HtmlHTMLAttributes<HTMLDivElement>)=>{
  return <div {...props} className={cn("flex w-full flex-col shadow gap-3 rounded-xl border p-5")} />;
};
