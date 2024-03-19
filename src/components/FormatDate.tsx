import React from "react";

const FormatDate = ({ date }: { date: string }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <span>{formattedDate}</span>;
};

export default FormatDate;
