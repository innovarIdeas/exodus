import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
  active: string;
}

const Breadcrumbs = ({ items,  active }: BreadcrumbProps) => {
  return (
    <div className="px-10 py-3 flex items-center">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link href={item.href} className="font-semibold text-blue text-sm">

            {item.label}

          </Link>
          {index < items.length - 1 && (
            <span className="text-xs p-3 text-blue">{"\u2B24"}</span>
          )}
        </React.Fragment>
      ))}
      <span className="text-xs p-3 text-blue">{"\u2B24"}</span>
      <span className="font-semibold text-gray2 text-sm">{active} </span>

    </div>
  );
};

export default Breadcrumbs;

