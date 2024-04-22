import * as XLSX from "xlsx";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

const DownloadBookVariantTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadTemplate = () => {
    setIsLoading(true);

    try {
      const templateData = [
        ["book_title", "book_author", "book_description", "variant_name", "tempbook_id", "paper_type", "number_of_words", "status", "hard_cover", "BW_print", "color_print", "cream_paper", "glossy_paper", "news_print", "binding", "white_paper", "no_of_books", "portrait", "quantity_of_Color", "quantity_of_BW", "book_size", "number_of_pages", "inside_layout", "proof_reading", "cover_design", "cover_design_type", "editing", "ISBN", "online_sale", "embossing", "foiling", "lamination", "delivery_name", "delivery_phone", "pick_up", "shipping_address", "shipping_state", "shipping_instruction", "project_type", "ready_to_print", "published", "work_in_progress", "word_count", "current_book_format", "inside_layout_type", "art_illustration", "art_illustration_type"]
      ];

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(templateData);

      XLSX.utils.book_append_sheet(workbook, worksheet, "BookVariantTemplate");

      XLSX.writeFile(workbook, "book_variant_template.xlsx");

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

export default DownloadBookVariantTemplate;
