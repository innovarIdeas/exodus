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
import { Textarea } from "@/components/ui/textarea";
import { createConstant } from "@/lib/api-call";
import { updateConstantSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ConstantForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  type TFormData = z.infer<typeof updateConstantSchema>;

  const form = useForm<TFormData>({ resolver: zodResolver(updateConstantSchema) });

  const onSubmit = async (input: TFormData) => {
    const { data, error, validationErrors } = await createConstant(input);

    if (data) {
      toast({
        variant: "default",
        description: "Constant created successfully!",
        title: "Success",
      });
      //   setUserID(data.id);

      // Invalidate all paginated queries for constants to maintain pagination state
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CONSTANTS],
        exact: false
      });
      form.reset();
    } else {
      console.log(data);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create Constant.",
      });
    }

    console.error("Failed to Create Product", error);

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message,
      });

      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <div className="flex items-center mb-4">
          <h2 className="font-bold text-xl">Create Constant</h2>
        </div>

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name </FormLabel>
                <FormControl>
                  <Input placeholder="Please enter a Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Code</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter short code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter value" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Please enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5 py-1">
          <div className="py-2 ">
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
            >
              {" "}
              Create Constant
            </Button>
          </div>

          <DialogClose>
            <div className="py-2 ">
              <Button
                type="button"
                className="text-sm  py-2 px-4 text-black rounded-sm delete-button border border-1 border-red  hover:font-semibold hover:bg-red"
              >
                Cancel
              </Button>
            </div>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default ConstantForm;
