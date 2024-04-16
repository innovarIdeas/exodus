"use client";

import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContextStore } from "@/context/ContextStore";
import { createTempBook } from "@/lib/api-call";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface FormData {
  title: string;
  name: string;
  phone_number: string;
  email: string;
  author: string;
  status: string;
}

const page = () => {
  const contextValues = useContext(ContextStore);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login");

  if (!contextValues) {
    return null;
  }

  const { readyToPrint, setName, setPhoneNumber, setEmail, setBookName, setReadyToPrint, setBook, setMagazine, setStationary, setWorkInProgress, workInProgress,  stationary, magazine, noOfBooks, bookSize, qualityOfColor, noOfPages } = contextValues;
  const router = useRouter();

  useEffect(()=> {
    const storedReadyToPrintString = localStorage.getItem("Exodus_ReadyToPrint");
    const storedReadyToPrint = storedReadyToPrintString !== null ? JSON.parse(storedReadyToPrintString) : null;

    if(storedReadyToPrint !== null) setReadyToPrint(storedReadyToPrint);

    const storedWorkInProgressString = localStorage.getItem("Exodus_WorkInProgress");
    const storedWorkInProgress = storedWorkInProgressString !== null ? JSON.parse(storedWorkInProgressString) : null;

    if(storedWorkInProgress !== null) setWorkInProgress(storedWorkInProgress);

    const storedBookString = localStorage.getItem("Exodus_Book");
    const storedBook = storedBookString !== null ? JSON.parse(storedBookString) : null;

    if(storedBook !== null) setBook(storedBook);

    const storedMagazineString = localStorage.getItem("Exodus_Magazine");
    const storedMagazine = storedMagazineString !== null ? JSON.parse(storedMagazineString) : null;

    if(storedMagazine !== null) setMagazine(storedMagazine);

    const storedStationaryString = localStorage.getItem("Exodus_Stationary");
    const storedStationary = storedStationaryString !== null ? JSON.parse(storedStationaryString) : null;

    if(storedStationary !== null) setStationary(storedStationary);
  }, []);

  const { register, handleSubmit,  formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (step0Data) =>{
    setLoading(true);
    setName(step0Data.name);
    setBookName(step0Data.title);
    setEmail(step0Data.email);
    setPhoneNumber(step0Data.phone_number);
    const projectType = stationary ? "stationary" : magazine ? "magazine" : "book";
    const myData = { ...step0Data, status: "active", project_type: projectType, ready_to_print: readyToPrint, work_in_progress: workInProgress, noOfBooks, bookSize, qualityOfColor, noOfPages };

    console.log("This is the data from form: ", myData);

    const { data, error, validationErrors } = await createTempBook(step0Data);

    if(data) {
      localStorage.setItem("Exodus_Book_Id", JSON.stringify(data.book.id));
      localStorage.setItem("Exodus_Book_Email", JSON.stringify(step0Data.email));
      localStorage.setItem("Exodus_Book_Phone", JSON.stringify(step0Data.phone_number));
      localStorage.setItem("Exodus_Author_Name", JSON.stringify(step0Data.name));
      localStorage.setItem("Exodus_Book_Title", JSON.stringify(step0Data.title));
      setLoading(false);

      toast({
        variant: "default",
        description: ("Successful"),
      });

      if(error || validationErrors) {
        toast({
          variant: "destructive",
          title: ("error_title"),
          description: ("error_desc"),
        });
      }

      if(data.existingUser.email !== "") {
        console.log("Data sent: ", data.existingUser.email, data.existingUser.password);

        const response = await signIn("credentials", {
          username: data.existingUser.email,
          password: data.existingUser.email,
          redirect: false,
        });

        if (response?.error) {
          toast({
            variant: "destructive",
            title: t("error_title"),
            description: t("error_desc"),
          });
        } else {
          toast({ description: t("signed_in") });
          router.push("/user/books/" + data.book.id);
        }
      }else{
        toast({
          variant: "destructive",
          title: t("error_title"),
          description: t("User not found"),
        });
      }
    }
  };

  return (

    <div style={{ backgroundImage: "url(\"/img/bg_light.png\")" }} className="pt-8">
      <div style={{ backgroundImage: "url(\"/img/bg_dark.png\")" }} className="p-8 rounded-3xl bg-cover drop-shadow-sm w-full md:w-[90%] lg:w-[60%] h-[100%] md:h-[80vh] lg:h-[70vh] mx-auto  md:overflow-y-scroll">

        <div className="mx-auto w-[95%] md:w-[80%] lg:w-[70%]">

          <form className="text-white" onSubmit={handleSubmit(onSubmit)} >
            <div className="mt-2 mb-10">
              <h1 className="text-center text-2xl">Please provide us the information below </h1>
            </div>
            <div className="mb-5">
              <label
                htmlFor="book_name"
                className="mb-3 block text-base font-medium text-white"
              >
                      Book Title
              </label>
              <input
                {...register("title")}
                type="text"
                name="title"
                id="title"
                placeholder="Book Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="book_name"
                className="mb-3 block text-base font-medium text-white"
              >
                      Author
              </label>
              <input
                {...register("author")}
                type="text"
                name="author"
                id="author"
                placeholder="Book Author"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="book_name"
                className="mb-3 block text-base font-medium text-white"
              >
                      Select status
              </label>
              <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" {...register("status")}>
                <option value="">Select book status</option>
                <option value="Ready to Print">Ready to Print</option>
                <option value="Work in Progress">Work in Progress</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="author_name"
                className="mb-3 block text-base font-medium text-white"
              >
                      Your Name
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone_number"
                className="mb-3 block text-base font-medium text-white"
              >
                      Phone Number
              </label>
              <div className="relative">
                <div className="absolute border border-[#e0e0e0] text-base font-medium text-[#6B7280] bg-transparent left-0 py-3 rounded-md px-3 top-0" >
                    +234
                </div>
                <input
                  {...register("phone_number", {
                    required: "Required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "invalid phone number"
                    }

                  })}
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Phone Number"
                  className="w-full rounded-md border pl-20 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.phone_number && <div className="text-[#fbfbfc]" >{errors.phone_number.message}</div>}
              </div>

            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-white"
              >
                      Email Address
              </label>
              <input
                {...register("email", {
                  pattern: {
                    value: /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "error message"
                  }
                })}
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button className=" rounded-xl bg-main py-3 px-10 text-base font-semibold z-[200000000] text-white outline-none mx-auto w-full text-center" type="submit"> {loading ? "Loading..." : "Continue"}  </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default page;
