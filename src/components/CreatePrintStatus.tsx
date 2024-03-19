import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { QUERY_KEY } from "@/lib/rbac";
import React from "react";
import { updateOrderPrintStatus } from "@/lib/api-call";
import { updateOrderSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICreateOrderProps {
  order_id: string;
}

const CreatePrintStatus = ({ order_id }: ICreateOrderProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

              type TFormData = z.infer<typeof updateOrderSchema>;

              const form = useForm<TFormData>({ resolver: zodResolver(updateOrderSchema) });

              const onSubmit = async (input: TFormData) => {
                const { data, error, validationErrors } = await updateOrderPrintStatus(order_id, input);

                if (data) {
                  toast({
                    variant: "default",
                    description: "Print Status updated successfully!",
                    title: "Success"
                  });

                  queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_ORDER] });
                  form.reset();
                } else {
                  console.error("Failed to Create Transaction", error);

                  toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to create transaction.",
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
                      {/* <FormField
                        control={form.control}
                        name="print_status"
                        render={({ field }) => (
                          <FormItem
                            className="w-full ">
                            <FormLabel> ... </FormLabel>
                            <FormControl>
                              <Input placeholder="Please enter the perfect binding cost" {...field} hidden />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}

                      <FormField
                        control={form.control}
                        name="print_status"
                        render={({ field }) => (
                          <FormItem
                            className="w-full">
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem  value={"Recieved"}>
                                    Recieved
                                </SelectItem>
                                <SelectItem value={"In Progress"}>
                                    In Progress
                                </SelectItem>
                                <SelectItem value={"Ready for pickup"}>
                                    Ready for pickup
                                </SelectItem>
                                <SelectItem value={"Delivery in process"}>
                                    Delivery in process
                                </SelectItem>
                                <SelectItem value={"Delivered"}>
                                    Delivered
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <div className="flex items-end justify-end my-3">
                        <Button type="submit" className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">
                          Update Status
                        </Button>
                      </div>

                    </div>
                  </form>
                </Form>
              );
};

export default CreatePrintStatus;

