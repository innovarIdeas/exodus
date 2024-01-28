import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import SelectPermission from "@/components/SelectPermission";
import { SheetClose } from "@/components/ui/sheet";
import { createRole } from "@/lib/api-call";
import { roleSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddPermission = () => {
  const { toast } = useToast();
  const router = useRouter();

  type TClientData = z.infer<typeof roleSchema>;

  const roleForm = useForm<TClientData>({ resolver: zodResolver(roleSchema), defaultValues: { built_in: false, active: true } });

  const onSubmitRole = async (input: z.infer<typeof roleSchema>) => {
    const { data, error, validationErrors } = await createRole(input);

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
        description: "Role created successfully",
      });
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex items-center border-b border-gray mb-4">
        <span className="px-4 text-main font-bold text-xs border-b-2 border-main pb-2"> Add Role</span>
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
                    <FormLabel className="text-main"> Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={roleForm.control}
                name="permissions_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main">Permission</FormLabel>
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
              <Button disabled={roleForm.formState.isSubmitting} className="bg-main text-white py-2 px-7 rounded-md font-medium text-xs" type="submit">Submit</Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default AddPermission;
