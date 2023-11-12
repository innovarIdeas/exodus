import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllBookVariant, useGetAllUser } from "@/lib/hook";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { createOrder } from "@/lib/api-call";
import { orderSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const OrderForm = () => {
  const { toast } = useToast();

          type TFormData = z.infer<typeof orderSchema>;

          const form = useForm<TFormData>({ resolver: zodResolver(orderSchema) });
          const books  = useGetAllBookVariant();
          const users = useGetAllUser();

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
                <div className="flex flex-col items-center">
                  <FormField
                    control={form.control}
                    name="book_variant_id"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel>Book Variant</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a book to create a variant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {books &&
                          books.map((book) => (
                            <SelectItem key={book.id} value={book.id}>
                              {book.variant_name}
                            </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="client_id"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel>Client</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a book to create a variant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users &&
                          users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Cover Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inner_page_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Inner Page Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="perfect_binding_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lamination_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Lamination Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wrapping_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Wrapping Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trim_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Trim Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="embossing_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spot_lamination_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foil_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="book_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service_cost"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inner_total"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover_total"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="delivery_address"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="delivery_fee"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                      <FormItem
                        className="w-full">
                        <FormLabel> Binding Cost </FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter the cover cost" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end justify-end my-3">
                    <Button type="submit" className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">
                      Next
                    </Button>
                  </div>

                </div>
              </form>
            </Form>
          );
};

export default OrderForm;

