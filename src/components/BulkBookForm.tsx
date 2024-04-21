import * as XLSX from "xlsx";
import React, { useState } from "react";
import { Button } from "./ui/button";
import DownloadBookTemplate from "./DownloadBookTemplate";
import { Input } from "./ui/input";
import { QUERY_KEY } from "@/lib/rbac";
import { ReloadIcon } from "@radix-ui/react-icons";
import { bulkBookSchema } from "@/models/validation-schema";
import { uploadBulkBooks } from "@/lib/api-call";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

const BulkBookForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  type TBookFormData = z.infer<typeof bulkBookSchema>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const onSubmit = async () => {
    if (!file) {
      toast({ variant: "destructive", description: "Please select a file" });

      return;
    }

    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const [firstSheetName] = workbook.SheetNames;
        const sheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        console.error(jsonData);
        const { data, error, validationErrors } = await uploadBulkBooks(jsonData as TBookFormData);

        if (data) {
          toast({ description: "Books created successfully" });
          await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_BOOKS] });
        }

        if (error || validationErrors?.length) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create books",
          });
        }
      } catch (error) {
        console.error("Error uploading bulk vendors:", error);

        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload bulk vendors. Invalid file format or data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className=" min-h-[500px]">
      <DownloadBookTemplate />
      <div className="py-5">

        <Input
          type="file"
          onChange={handleFileChange}
          disabled={isLoading}
          className="my-5"
        />
        <Button
          onClick={onSubmit}
          disabled={!file || isLoading}
          className="bg-blue text-white"
        >
          {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default BulkBookForm;
