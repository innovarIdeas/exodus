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
import { Input } from "@/components/ui/input";
import { QUERY_KEY } from "@/lib/rbac";
import React from "react";
import { couponSchema } from "@/models/validation-schema";
import { createCoupon } from "@/lib/api-call";
import { generateCouponCode } from "@/lib/uuid-helper";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CouponForm = () => {
  const { toast } = useToast();
  const queryclient = useQueryClient();

        type TFormData = z.infer<typeof couponSchema>;

        const form = useForm<TFormData>({ resolver: zodResolver(couponSchema), defaultValues: { name: generateCouponCode() } });

        const onSubmit = async (input: TFormData) => {
          const { data, error, validationErrors } = await createCoupon(input);

          if (data) {
            toast({
              variant: "default",
              description: "Coupon added successfully!",
              title: "Success"
            });

            queryclient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_COUPONS] });
            form.reset();
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to create coupon.",
            });

            console.error("Failed to Create Coupon", error);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))} className="form">

              <div className="py-1">

                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Percentage </FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={99} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-1">

                <FormField
                  control={form.control}
                  name="expires_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gblue">Valid Until</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().split("T")[0] : field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              <div className="flex gap-5 py-1">

                <div className="py-2 ">
                  <Button type="button" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">  Add Book</Button>
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

export default CouponForm;

