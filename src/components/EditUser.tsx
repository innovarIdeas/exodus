import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "./ui/dialog";
import EditUserRole from "./EditUserRole";
import { IUser } from "@/models/models";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema } from "@/models/validation-schema";
import { editUser } from "@/lib/api-call";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProps {
  user: IUser;
}

const ViewClient = ({ user }: UserProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  type TFormData = z.infer<typeof UpdateUserSchema>;

  const form = useForm<TFormData>({ resolver: zodResolver(UpdateUserSchema), defaultValues: { name: user.name, email: user.email } });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (input: TFormData) => {
    const { data, error, validationErrors } = await editUser(user.id, input);

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message
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
        description: "User updated!",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))} className="form">
                <div className="flex items-center border-b border-gray mb-4">
                  <span className="px-4 text-blue font-bold text-xs border-b-2 border-blue pb-2"> Details</span>
                  <span className="px-4 text-gray2 font-semibold text-xs pb-2">Roles </span>

                </div>

                <div className="py-1">

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
                </div>
                <div className="py-1">

                </div>
                <div>

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
                </div>

                <div className="flex gap-5 py-1">

                  <div className="py-2 ">
                    <Button type="button" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green">  Update User</Button>
                  </div>
                  <div className="py-2 ">
                    <Button className="bg-white hover:bg-[#92919e] shadow-md text-blue py-2 px-7 rounded-md mx-1 font-medium text-xs" onClick={nextStep}>Next </Button>
                  </div>
                  <DialogClose>
                    <div className="py-2 ">
                      <Button type="button" className="text-sm  py-2 px-4 text-black rounded-sm delete-button border border-1 border-red  hover:font-semibold hover:bg-red">Cancel</Button>
                    </div>
                  </DialogClose>

                </div>

              </form>
            </Form>
          </>
        );
      case 2:
        return <EditUserRole userID={user.id} nextStep={nextStep} prevStep={prevStep}/>;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default ViewClient;
