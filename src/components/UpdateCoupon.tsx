import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import { QUERY_KEY } from "@/lib/rbac";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { updateCoupon } from "@/lib/api-call";
import { updateCouponSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IEditUserFormProps {
  id: string;
  status: boolean;
}

const UpdateCouponForm = ({ id, status }: IEditUserFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

        type TFormData = z.infer<typeof updateCouponSchema>;

        const form = useForm<TFormData>({ resolver: zodResolver(updateCouponSchema), defaultValues: { status } });

        const onSubmit = async (input: TFormData) => {
          const { data, error, validationErrors } = await updateCoupon(id, input);

          if (data) {
            toast({
              variant: "default",
              description: "User updated successfully!",
              title: "Success"
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_COUPONS] });
            form.reset();
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update User.",
            });
          }

          console.error("Failed to Create Product", error);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))} className="form">

              <div className="py-1">

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Active </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5 py-1">

                <div className="py-2 ">
                  <Button type="button" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">  Update</Button>
                </div>

                <DialogClose>
                  <div className="py-2 ">
                    <Button type="button" className="text-sm  py-2 px-4 text-black rounded-sm delete-button border border-1 border-red  hover:font-semibold hover:bg-red">Cancel</Button>
                  </div>
                </DialogClose>

              </div>

            </form>
          </Form>
        );
};

export default UpdateCouponForm;

