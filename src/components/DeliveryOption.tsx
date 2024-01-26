"use client"

import { ContextStore } from '@/context/ContextStore';
import React, { useContext } from 'react'
import { useForm } from "react-hook-form";

const DeliveryOption = () => {
    const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {deliveryName, setDeliveryName, deliveryPhone, setDeliveryPhone, shippingInstruction, setShippingInstruction, shippingAddress, setShippingAddress, shippingState, setShippingState, pickUp, setPickUp } = contextValues;
    const { register, reset ,handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <div className='py-12 min-h-screen'>
        <form >
            <div >
                <h1  className="font-semibold text-3xl">Delivery Option</h1>

                <div className="md:grid grid-cols-2 gap-4 pt-6">

                    <div className="p mb-5">

                        <h1> Name</h1>
                        <input
                        onChange={(e)=>setDeliveryName(e.target.value)}
                        value={deliveryName}
                        // {...register("delivery_name")}
                        type="text"
                        name="delivery_name"
                        id="delivery_name"
                        placeholder="Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div>

                    <h1> Phone Number</h1>
                    <div className="relative">
                        <div className="absolute border border-[#e0e0e0] text-base font-medium text-[#6B7280] bg-transparent left-0 py-3 rounded-md px-3 top-0" >+234</div>
                        <input
                        onChange={(e)=>setDeliveryPhone(e.target.value)}
                        value={deliveryPhone}
                        // {...register("delivery_phone")}
                        type="number"
                        name="delivery_phone"
                        id="delivery_phone"
                        placeholder="phone no"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white pl-20 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        /> 
                    </div>
                    </div>
                </div>
                <div className="flex gap-2 pt-4">
                    <input
                    onChange={(e)=>setPickUp(e.target.checked)}
                    checked={pickUp}     
                    type="checkbox"
                    name="pick_up"
                    id="pick_up"
                    placeholder="pick_up"
                    className="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <h1 className="text-sm"> Do not ship, I will pick up my book at Magic Wand office location.</h1>
                            
                </div>
                        
                {!pickUp && <>
                    <div className="pt-8" >
                    <h1> Shipping Address</h1>
                    <textarea
                    onChange={(e)=>setShippingAddress(e.target.value)}
                    value={shippingAddress}
                    // {...register("shipping_address")}
                    name="shipping_address"
                    id="shipping_address"
                    placeholder="shipping_address"
                    className="w-[100%] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    </div>
                    <div className="md:grid grid-cols-2 gap-4 pt-4">

                        <div className="p mb-5">
                        <h1> City</h1>
                        <input
                        // {...register("shipping_city")}
                        type="text"
                        name="shipping_city"
                        id="shipping_city"
                        placeholder="city"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div>

                        <h1> State</h1>
                        <input
                        onChange={(e)=>setShippingState(e.target.value)}
                        value={shippingState}
                        // {...register("shipping_state")} 
                        type="text"
                        name="shipping_state"
                        id="shipping_state"
                        placeholder="state"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>      
                        
                    </div>
                    <div className="pt-8">

                    <h1> Special Instruction</h1>
                    <input
                    onChange={(e)=>setShippingInstruction(e.target.value)}
                    value={shippingInstruction}
                    type="text"
                    // {...register("shipping_instruction")} 
                    name="shipping_instruction"
                    id="shipping_instruction"
                    placeholder="city"
                    className="w-[80%] h-[100px] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    </div>
                </>}
          </div>
      </form>
  </div>
  )
}

export default DeliveryOption
