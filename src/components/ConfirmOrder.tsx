import React, { useContext, useEffect } from 'react'
import BookOptionTable from './BookOptionTable'
import { useQuery } from "@tanstack/react-query";
import TempBookData from './TempBookData';
import { ContextStore } from '@/context/ContextStore';
import { getSingleTempBook } from '@/lib/api-call';
import { toast } from "@/components/ui/use-toast";

const ConfirmOrder = () => {
    const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {setTermsAndCondition, termsAndCondition, setSubmitForm } = contextValues;
    const singleBookString = localStorage.getItem('Single_Temp_Book')
    const singleBook = singleBookString !== null && JSON.parse(singleBookString)
    const bookData = TempBookData()
    
    return(   
        <div className='pt-8'>
            <h1  className="font-semibold text-3xl">Project Summary</h1>
            <div className="w-full">
                <div className="md:grid grid-cols-6 gap-4 pt-6">
                    <div className="col-span-2">
                        <img className="w-[50%] md:w-full" src="/img/book2.png" />
                    </div>
                    <div className="col-span-3  mt-10">
                        <div className="w-full mb-5">

                            <h1>Book  Name</h1>
                            <input
                            value={singleBook.title}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Book name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="w-full mb-5">
                                <h1> Author's Name</h1>
                                <input
                                value={singleBook.name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                        </div>
                    </div>
                    
                </div>
                <div className="pb-[200px] w-full  mt-[60px]">
                    <h1 className="text-xl">Quotation Details</h1>
                    <div className="mt-6  h-auto table  w-full">
                        <BookOptionTable bookData={bookData} />

                        <div onClick={()=>{setTermsAndCondition((prev)=>!prev); setSubmitForm((prev)=>!prev)}} className="mt-[20px]">
                        <input checked={termsAndCondition} className="mr-4" type='checkbox' />
                        <label>I have read and agree to the Terms and Conditions</label> 
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ConfirmOrder
