import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import { QUERY_KEY } from "@/lib/rbac";
import React from "react";
import { deleteBook } from "@/lib/api-call";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface IEditBookFormProps {
  id: string;
}

const DeleteBook = ({ id }: IEditBookFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const Delete = async () => {
    const { data, error, validationErrors } = await deleteBook(id);

    if (data) {
      toast({
        variant: "default",
        description: "Book deleted successfully!",
        title: "Success"
      });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_BOOKS] });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete book.",
      });

      console.error("Failed to delete book", error);
    }

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message
      });

      return;
    }
  };

  return (

    <div className="flex gap-5 py-1">

      <div className="py-2 ">
        <Button type="button"  onClick={Delete} className="text-sm bg-red py-2 px-4 delete-button border border-1 border-red rounded-sm   hover:font-semibold hover:bg-red">  Yes, Delete Book</Button>
      </div>

      <DialogClose>
        <div className="py-2 ">
          <Button type="button" className="text-sm  py-2 px-4 text-black rounded-sm create-button border border-1 border-green  hover:font-semibold hover:bg-green">Cancel</Button>
        </div>
      </DialogClose>
    </div>
  );
};

export default DeleteBook;

