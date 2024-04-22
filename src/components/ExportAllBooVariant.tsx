
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { exportAllBookVariants } from "@/lib/api-call";
import { useToast } from "@/components/ui/use-toast";

const ExportAllBookVariants = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const { data, error, validationErrors } = await exportAllBookVariants();

    if (validationErrors?.length) {
      setIsLoading(false);

      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message
      });

      return;
    }

    if (error) {
      setIsLoading(false);

      toast({
        variant: "destructive",
        title: "Error",
        description: "failed to export excel file",
      });

      return;
    }

    if (data) {
      setIsLoading(false);
      const workbook = XLSX.utils.book_new();
      const sheet = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(workbook, sheet, "exodus-book-variant");

      const writingOptions: XLSX.WritingOptions = {
        type: "array",
        bookType: "xlsx"
      };
      const excelBuffer = XLSX.write(workbook, writingOptions)  as unknown as BlobPart;
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "exodus_book-variants.xlsx";
      link.click();

      toast({
        variant: "default",
        title: "Success",
        description: "Exported Sucessfully!",
      });
    }
  };

  return (
    <div>
      <Button onClick={onSubmit} disabled={isLoading} className="bg-white border shadow-sm text-black hover:bg-white hover:text-blue text-left w-full flex  justify-start">
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
       Export
      </Button>
    </div>
  );
};

export default ExportAllBookVariants;
