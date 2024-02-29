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
import { updateTransaction } from "@/lib/api-call";
import { updateTransactionSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICreateOrderProps {
  tran_id: string;
  status: string;
}

const UpdateTransaction = ({ tran_id, status }: ICreateOrderProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

                type TFormData = z.infer<typeof updateTransactionSchema>;

                const form = useForm<TFormData>({ resolver: zodResolver(updateTransactionSchema), defaultValues: { status: status } });

                const onSubmit = async (input: TFormData) => {
                  const { data, error, validationErrors } = await updateTransaction(tran_id, input);

                  if (data) {
                    toast({
                      variant: "default",
                      description: "Transaction created successfully!",
                      title: "Success"
                    });

                    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_TRANSACTION] });

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
                            update Transaction
                          </Button>
                        </div>

                      </div>
                    </form>
                  </Form>
                );
};

export default UpdateTransaction;

