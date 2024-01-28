import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";
import SelectPermission from "@/components/SelectPermission";
import { SheetClose } from "@/components/ui/sheet";
import { updateRole } from "@/lib/api-call";
import { updateRoleSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const optionSchema = zod.object({
  value: zod.string(),
  label: zod.string(),
  id: zod.string(),
});

type TPermission = zod.infer<typeof optionSchema>;

interface Props {
  id: string;
  name: string;
  active: boolean;
  permissions: TPermission[];
}

const AddPermission = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  type TClientData = zod.infer<typeof updateRoleSchema>;

  const roleForm = useForm<TClientData>({ resolver: zodResolver(updateRoleSchema), defaultValues: { name: props.name, active: props.active, permissions_ids: props.permissions } });

  const onSubmitRole = async (input: zod.infer<typeof updateRoleSchema>) => {
    const { data, error, validationErrors } = await updateRole(input, props.id);

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
        title: "Success",
        variant: "default",
        description: "Role updated successfully",
      });
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex items-center border-b border-gray mb-4">
        <span className="px-4 text-main font-bold text-xs border-b-2 border-main pb-2">Edit Role</span>
      </div>
      <Form {...roleForm} >
        <form onSubmit={roleForm.handleSubmit(onSubmitRole, (error) => console.error(error))}>
          <fieldset disabled={roleForm.formState.isSubmitting}>
            <div className="grid gap-4">
              <FormField
                control={roleForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={roleForm.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-1">
                    <FormLabel className="text-main"> Active</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={roleForm.control}
                name="permissions_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main"> Permission</FormLabel>
                    <FormControl>
                      <SelectPermission {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>

            <div className="my-5">
              <SheetClose asChild>
                <Button className="border border-danger text-danger bg-white py-2 rounded-md px-4 mx-1 font-medium text-xs"> Cancel</Button>
              </SheetClose>
              <Button disabled={roleForm.formState.isSubmitting} className="bg-main text-white py-2 px-7 rounded-md font-medium text-xs" type="submit"> Submit</Button>
            </div>

          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default AddPermission;
