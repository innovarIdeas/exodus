import * as XLSX from "xlsx";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

const DownloadBookTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadTemplate = () => {
    setIsLoading(true);

    try {
      const templateData = [
        ["title", "author", "status", "description"]
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(templateData);

      XLSX.utils.book_append_sheet(workbook, worksheet, "BookTemplate");

      XLSX.writeFile(workbook, "book_template.xlsx");

      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading template:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button onSubmit={handleDownloadTemplate} type="button" onClick={handleDownloadTemplate} disabled={isLoading} className="bg-white text-black hover:bg-white hover:text-blue text-left w-full flex  justify-start">
      {isLoading ? <DownloadIcon className="mr-2 h-4 w-4 animate-bounce"/> : <p>Download Template</p>}
    </Button>
  );
};

export default DownloadBookTemplate;
