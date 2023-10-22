"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { loginSchema } from "@/models/validation-schema";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import {  useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  type Tlogin = z.infer<typeof loginSchema >;

  const t = useTranslations("login");
  const router = useRouter();
  const form = useForm<Tlogin>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: z.infer<typeof loginSchema >) => {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          toast({
            variant: "destructive",
            title: t("error_title"),
            description: t("error_desc"),
          });
        } else {
          toast({ description: t("signed_in") });
          router.push("/admin");
        }
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen w-1/2 flex-col  items-center justify-center bg-gradient-to-t from-[#ff1361bf] to-[#44107A] p-4 text-white dark:text-black lg:flex">
        <div className="mx-auto mb-5 w-full">
          <img src="morden-printing.jpg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
        </div>
        <h3 className="mb-4 text-center text-3xl font-bold">Login to your Exodus Account</h3>
        <p> Either you run the day or the day runs you. - Jim Rohn </p>
      </div>
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
        <div className="max-w-[480px] p-5 md:p-10">
          <h2 className="mb-3 text-3xl font-bold">Sign In</h2>
          <p className="mb-7">Enter your email and password to login</p>

          <Form {...form} >
            <form onSubmit={ form.handleSubmit(onSubmit, (error) => console.error(error))}>
              <fieldset disabled={form.formState.isSubmitting}>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gblue">{t("username")}</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bank name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gblue">{t("password")}</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter branch" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                </div>

                <div className="flex justify-between my-5">
                  <div>

                    <Button  type="submit" className="btn btn-primary w-full" >{t("login")}</Button>
                  </div>

                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
