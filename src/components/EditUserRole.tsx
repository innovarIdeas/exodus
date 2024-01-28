import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { addUserRole, getUserRoles } from "@/lib/api-call";
import { Button } from "@/components/ui/button";
import SelectRoles from "./SelectRole";
import { claimSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProps {
  nextStep: () => void;
  prevStep: () => void;
  userID?: string;
}

const EditUserRole = ({ userID,  prevStep }: UserProps) => {
  const { toast } = useToast();

  const optionSchema = z.object({
    value: z.string(),
    label: z.string(),
    id: z.string(),
  });

    type TUserClaimFormData = z.infer<typeof claimSchema>;
    type TPermission = z.infer<typeof optionSchema>;

    const userRoleForm = useForm<TUserClaimFormData>({ resolver: zodResolver(claimSchema), defaultValues: { user_id: userID, type: "ROLE", active: true } });

    useEffect(() => {
      const fetchUserRoles = async () => {
        if (!userID) return;
        const { data, error, validationErrors } = await getUserRoles(userID);

        if (validationErrors?.length) {
          toast({
            variant: "destructive",
            title: "Error",
            description: validationErrors[0].message
          });

          return;
        }

        if (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong.",
          });

          return;
        }

        if (data) {
          const roles: TPermission[] = [];

          data.forEach((role) => {
            roles.push({ value: role.role.id, label: role.role.name, id: role.role.id });
          });

          userRoleForm.setValue("permission_id", roles);
        }
      };

      fetchUserRoles();
    }, [toast, userID, userRoleForm]);

    const onSubmitRole = async (input: TUserClaimFormData) => {
      const { data, error, validationErrors } = await addUserRole(input);

      if (validationErrors?.length) {
        toast({
          variant: "destructive",
          title: "Error",
          description: validationErrors[0].message
        });

        return;
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong.",
        });

        return;
      }

      if (data) {
        toast({
          variant: "default",
          title: "Success",
          description: "User role added successfully",
        });
      }
    };

    return <>
      <div className="flex items-center border-b border-gray mb-4">
        <span className="px-4 text-gray2 font-semibold text-xs pb-2">Details</span>
        <span className="px-4 text-blue font-bold text-xs border-b-2 border-blue pb-2">Roles</span>

      </div>

      <Form {...userRoleForm} >
        <form onSubmit={userRoleForm.handleSubmit(onSubmitRole, (error) => console.error(error))}>
          <fieldset disabled={userRoleForm.formState.isSubmitting}>
            <FormField
              control={userRoleForm.control}
              name="permission_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gblue">Roles</FormLabel>
                  <FormControl>
                    <SelectRoles {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            <div className="flex justify-between my-5">
              <div>
                <Button className="bg-white text-green py-2 px-7 rounded-md mx-1 font-medium text-xs" type="button" onClick={prevStep}> Previous</Button>
                <Button disabled={userRoleForm.formState.isSubmitting} className="bg-blue text-white py-2 px-7 rounded-md mx-1 font-medium text-xs" type="submit">Submit</Button>
              </div>

            </div>
          </fieldset>
        </form>
      </Form>

    </>;
};

export default EditUserRole;
