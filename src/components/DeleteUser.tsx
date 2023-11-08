import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import React from "react";
import { deleteUser } from "@/lib/api-call";
import { useToast } from "@/components/ui/use-toast";

interface IEditUserFormProps {
  id: string;
}

const DeleteUser = ({ id }: IEditUserFormProps) => {
  const { toast } = useToast();

  const Delete = async () => {
    const { data, error, validationErrors } = await deleteUser(id);

    if (data) {
      toast({
        variant: "default",
        description: "User deleted successfully!",
        title: "Success"
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete User.",
      });

      console.error("Failed to delete user", error);
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
        <Button type="button"  onClick={Delete} className="text-sm bg-red py-2 px-4 delete-button border border-1 border-red rounded-sm   hover:font-semibold hover:bg-red">  Yes, Delete User</Button>
      </div>

      <DialogClose>
        <div className="py-2 ">
          <Button type="button" className="text-sm  py-2 px-4 text-black rounded-sm create-button border border-1 border-green  hover:font-semibold hover:bg-green">Cancel</Button>
        </div>
      </DialogClose>
    </div>
  );
};

export default DeleteUser;

