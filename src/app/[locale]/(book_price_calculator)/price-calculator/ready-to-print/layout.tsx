"use client";

import React, { useContext } from "react";
import { editTempBook, firstTimeOrder } from "@/lib/api-call";
import { ContextStore } from "@/context/ContextStore";
import TempBookData from "@/components/TempBookData";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const { setCurrentStep, currentStep, whitePaper, glossyPaper, creamPaper, newsPrint, binding, bwPrint, colorPrint, bothPrint, noOfPages, bookSize, noOfBooks, deliveryName, deliveryPhone, pickUp, shippingAddress, shippingInstruction, shippingState, submitForm,  termsAndCondition, nextOpen, qualityOfColor } = contextValues;
  const bookId = localStorage.getItem("Exodus_Book_Id");
  const book_id = bookId !== null && JSON.parse(bookId);
  const bookData = TempBookData();
  const router = useRouter();

  const createFirstTimeOrder = async ()=>{
    const { data, error, validationErrors } = await firstTimeOrder(book_id);

    if (error || validationErrors) {
      toast({
        variant: "destructive",
        description: ("Error in creating order"),
      });
    }

    if (data) {
      toast({
        variant: "default",
        description: ("Order created"),
      });

      await signIn("credentials", {
        username: data.user.email,
        password: data.user.email,
        redirect: false
      })
        .then((response) => {
          if (response?.error) {
            toast({
              variant: "destructive",
              title: "Sign In error",
              description: "Couldn't sign you in",
            });
          } else {
            toast({ description: "Signed in sucessfully" });
            router.push("/user/invoices/pdf/" + data.order.id);
          }
        });
    }
  };

  const handleNext = async () => {
    if(currentStep === 1 && (whitePaper || glossyPaper || creamPaper || newsPrint) && (binding.includes("Perfect") || binding.includes("Staple") || binding.includes("Hard")) && (bwPrint || colorPrint || bothPrint)) {
      setCurrentStep(currentStep + 1);
    } else if(currentStep === 2 && noOfPages !== 0 && bookSize !== "" && noOfBooks >= 50) {
      setCurrentStep(currentStep + 1);
    } else if(currentStep === 3) {
      setCurrentStep(currentStep + 1);
    } else if(currentStep === 4 && deliveryName !== "" && deliveryPhone !== "") {
      if (bookData !== null) {
        const { data, error } = await editTempBook(book_id, { ...bookData, quantity_of_color: qualityOfColor });

        if(data) {
          localStorage.setItem("Single_Temp_Book", JSON.stringify(data));

          toast({
            variant: "default",
            description: ("Temp Book Updated"),
          });
        }

        if(error) {
          toast({
            variant: "default",
            description: ("Error"),
          });
        }
      }

      if(pickUp) {
        setCurrentStep(currentStep + 1);
      } else if(!pickUp && shippingAddress !== "" && shippingInstruction !== "" && shippingState !== "") {
        setCurrentStep(currentStep + 1);
      }else{
        setCurrentStep(currentStep);
      }
    }else if(currentStep === 5 && termsAndCondition) {
      // setSubmitForm(true)
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="h-full relative">
      <div className="lg:w-[20%] overflow-x-scroll py-4 w-full lg:h-full border text-sm flex lg:flex-col item-center gap-1 lg:pt-10 fixed top-28 lg:top-auto bg-slate-50 z-10">
        <div className={`${currentStep === 1 && "border-r-4 border-r-blue-800"} flex item-start gap-4 shrink-0 lg:gap-10 py-2 px-4 lg:px-8`}>
          <p className="font-bold">1</p>
          <div>
            <p className="font-bold">Step 1</p>
            <p className="text-indigo-500 cursor-pointer">Paper Information</p>
          </div>
        </div>

        <div className={`${currentStep === 2 && "border-r-4 border-r-blue-800"} flex item-start gap-4 shrink-0 lg:gap-10 py-2 px-4 lg:px-8`}>
          <p className="font-bold">2</p>
          <div>
            <p className="font-bold">Step 2</p>
            <p className="text-indigo-500 cursor-pointer">Book Page Information</p>
          </div>
        </div>

        <div className={`${currentStep === 3 && "border-r-4 border-r-blue-800"} flex item-start gap-4 shrink-0 lg:gap-10 py-2 px-4 lg:px-8`}>
          <p className="font-bold">3</p>
          <div>
            <p className="font-bold">Step 3</p>
            <p className="text-indigo-500 cursor-pointer">Book Cover Information</p>
          </div>
        </div>

        <div className={`${currentStep === 4 && "border-r-4 border-r-blue-800"} flex item-start gap-4 shrink-0 lg:gap-10 py-2 px-4 lg:px-8`}>
          <p className="font-bold">4</p>
          <div>
            <p className="font-bold">Step 4</p>
            <p className="text-indigo-500 cursor-pointer">Delivery Option</p>
          </div>
        </div>

        <div className={`${currentStep === 5 && "border-r-4 border-r-blue-800"} flex item-start gap-4 shrink-0 lg:gap-10 py-2 px-4 lg:px-8`}>
          <p className="font-bold">5</p>
          <div>
            <p className="font-bold">Step 5</p>
            <p className="text-indigo-500 cursor-pointer">Confirm Order</p>
          </div>
        </div>

      </div>
      {children}

      <div className="flex shadow-md justify-between px-20 sticky bottom-0 py-6 border bg-slate-50 lg:ml-[20%] bg-opacity-90">
        <button onClick={()=>handlePrev()} className="px-5 py-2 rounded-xl border border-red text-red flex items-center gap-4 justify-between">
          <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg></span> Back</button>
        {submitForm ?
          <button onClick={()=>createFirstTimeOrder()} className="px-5 py-2 rounded-xl border bg-green text-white shadow flex items-center gap-4 justify-between"> Create Order
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 text-white h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button> :
          <button onClick={()=>handleNext()} className={`px-5 py-2 rounded-xl border ${nextOpen && "bg-blue-800 text-white"}  shadow flex items-center gap-4 justify-between`}> Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        }
      </div>
    </div>
  );
};

export default layout;
