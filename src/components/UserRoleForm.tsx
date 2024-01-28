import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; import { Button } from "@/components/ui/button";
import React from "react";
import SelectRoles from "./SelectRole";
import { SheetClose } from "@/components/ui/sheet";
import { addUserRole } from "@/lib/api-call";
import { claimSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProps {
  nextStep: () => void;
  userID?: string;
}

const AddUserRole = ({ userID, nextStep }: UserProps) => {
  const { toast } = useToast();

  type TUserRoles = z.infer<typeof claimSchema>;

  const userRoleForm = useForm<TUserRoles>({ resolver: zodResolver(claimSchema), defaultValues: { type: "ROLE", active: true, user_id: userID } });

  const onSubmitRole = async (input: z.infer<typeof claimSchema>) => {
    const { data, error, validationErrors } = await addUserRole(input);

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User roles could not be added",
      });
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });

      return;
    }

    toast({
      title: "Success",
      variant: "default",
      description: `User roles added! for ${data?.name}`,
    });
    nextStep();
  };

  return <>
    <div className="flex items-center border-b border-gray mb-4">
      <span className="px-4 text-gray2 font-semibold text-xs pb-2">Details</span>
      <span className="px-4 text-blue font-bold text-xs border-b-2 border-blue pb-2"> Roles</span>

    </div>

    <Form {...userRoleForm} >
      <form onSubmit={userRoleForm.handleSubmit(onSubmitRole, (error) => console.error(error))}>
        <fieldset disabled={userRoleForm.formState.isSubmitting}>
          <FormField
            control={userRoleForm.control}
            name="permission_id"
            render={({ field }) => (
              <FormItem data-cy="select-staff">
                <FormLabel className="text-gblue"> Roles</FormLabel>
                <FormControl>
                  <SelectRoles {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <div className="flex justify-between my-5">
            <div>
              <SheetClose asChild>
                <Button className="border border-danger text-danger bg-white py-2 rounded-md px-4 mx-1 font-medium text-xs"> Cancel</Button>
              </SheetClose>
              <Button data-cy="select-user-role-btn" disabled={userRoleForm.formState.isSubmitting} className="bg-blue text-white py-2 px-7 rounded-md mx-1 font-medium text-xs" type="submit">Submit</Button>
            </div>

          </div>
        </fieldset>
      </form>
    </Form>

  </>;
};

export default AddUserRole;

