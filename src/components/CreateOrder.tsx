import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { createOrder } from "@/lib/api-call";
import { orderSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICreateOrderProps {
  book_variant_id: string;
}

const CreateOrder = ({ book_variant_id }: ICreateOrderProps) => {
  const { toast } = useToast();

            type TFormData = z.infer<typeof orderSchema>;

            const form = useForm<TFormData>({ resolver: zodResolver(orderSchema), defaultValues: { book_variant_id } });

            const onSubmit = async (input: TFormData) => {
              const { data, error, validationErrors } = await createOrder(input);

              if (data) {
                toast({
                  variant: "default",
                  description: "Order created successfully!",
                  title: "Success"
                });

                form.reset();
              } else {
                console.error("Failed to Create Order", error);

                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to create order.",
                });
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
                  <div className="flex flex-col gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="book_variant_id"
                      render={({ field }) => (
                        <FormItem
                          className="w-full hidden">
                          <FormLabel> Perfect Binding Cost </FormLabel>
                          <FormControl>
                            <Input placeholder="Please enter the perfect binding cost" {...field} hidden />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end justify-end my-3">
                      <Button type="submit"
                        disabled={form.formState.isSubmitting}
                        className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">
                        Create Order
                      </Button>
                    </div>

                  </div>
                </form>
              </Form>
            );
};

export default CreateOrder;

