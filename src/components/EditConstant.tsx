import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { IConstant } from "@/models/models";
import { Input } from "./ui/input";
import { QUERY_KEY } from "@/lib/rbac";
import React from "react";
import { SheetClose } from "./ui/sheet";
import { updateConstant } from "@/lib/api-call";
import { updateConstantSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditConstantProps {
  constant: IConstant;
}

export function EditConstant ({ constant }: EditConstantProps) {
  type TFormValues = z.infer<typeof updateConstantSchema>;

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<TFormValues>({
    resolver: zodResolver(updateConstantSchema),
    defaultValues: {
      name: constant.name,
      value: constant.value,
      shortcode: constant.shortcode,
    },
  });

  const onSubmit = async (input: TFormValues) => {
    const { data, error, validationErrors } = await updateConstant(
      constant.id,
      input
    );

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message,
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
        description: "Constant updated!",
      });

      // Invalidate all paginated queries for constants to maintain pagination state
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEY.GET_ALL_CONSTANTS],
        exact: false 
      });
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Constant Name </FormLabel>
                  <FormControl>
                    <Input placeholder={constant.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-1">
            <FormField
              control={form.control}
              name="shortcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> ShortCode </FormLabel>
                  <FormControl>
                    <Input placeholder={constant.shortcode} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-1">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Constant Value </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className=" mt-2">
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
            >
              {" "}
              Update Constant
            </Button>

            <SheetClose asChild>
              <Button
                className={
                  "border border-danger text-danger bg-white py-2 rounded-md px-4 mx-1 font-medium text-xs"
                }
                type="button"
              >
                Cancel
              </Button>
            </SheetClose>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditConstant;
