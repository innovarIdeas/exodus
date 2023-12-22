import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { createTransaction } from "@/lib/api-call";
import { transactionSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICreateOrderProps {
  order_id: string;
}

const CreateTransaction = ({ order_id }: ICreateOrderProps) => {
  const { toast } = useToast();

              type TFormData = z.infer<typeof transactionSchema>;

              const form = useForm<TFormData>({ resolver: zodResolver(transactionSchema), defaultValues: { order_id } });

              const onSubmit = async (input: TFormData) => {
                const { data, error, validationErrors } = await createTransaction(input);

                if (data) {
                  toast({
                    variant: "default",
                    description: "Transaction created successfully!",
                    title: "Success"
                  });

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
                      <FormField
                        control={form.control}
                        name="order_id"
                        render={({ field }) => (
                          <FormItem
                            className="w-full hidden">
                            <FormLabel> ... </FormLabel>
                            <FormControl>
                              <Input placeholder="Please enter the perfect binding cost" {...field} hidden />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem
                            className="w-full">
                            <FormLabel>Book</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a transaction type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>

                                <SelectItem value={"CASH"}>
                                    Cash
                                </SelectItem>
                                <SelectItem value={"CARD"}>
                                    Card
                                </SelectItem>
                                <SelectItem value={"TRANSFER"}>
                                    Transfer
                                </SelectItem>

                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem
                            className="w-full">
                            <FormLabel>Book</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem  value={"PENDING_CONFIRMATION"}>
                                    Pending Confirmation
                                </SelectItem>
                                <SelectItem value={"CONFIRMED"}>
                                    Confirmed
                                </SelectItem>
                                <SelectItem value={"FAILED"}>
                                    Failed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <div className="flex items-end justify-end my-3">
                        <Button type="submit" className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">
                          Create Order
                        </Button>
                      </div>

                    </div>
                  </form>
                </Form>
              );
};

export default CreateTransaction;

