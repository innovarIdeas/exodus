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
import React from "react";
import { createUser } from "@/lib/api-call";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {  userSchema } from "@/models/validation-schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProps {
  nextStep: () => void;
  setUserID: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserForm = ({ setUserID, nextStep }: UserProps) => {
  const { toast } = useToast();

    type TFormData = z.infer<typeof userSchema>;

    const form = useForm<TFormData>({ resolver: zodResolver(userSchema) });

    const onSubmit = async (input: TFormData) => {
      const { data, error, validationErrors } = await createUser(input);

      if (data) {
        toast({
          variant: "default",
          description: "User created successfully!",
          title: "Success"
        });
        setUserID(data.id);
        nextStep();

        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create User.",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="form">
          <div className="flex items-center border-b border-gray mb-4">
            <span className="px-4 text-main font-bold text-xs border-b-2 border-main pb-2"> Name</span>
            <span className="px-4 text-gray2 font-semibold text-xs pb-2"> Roles</span>

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Please a valid password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 py-1">

            <div className="py-2 ">
              <Button type="button" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">  Create User</Button>
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

export default UserForm;

