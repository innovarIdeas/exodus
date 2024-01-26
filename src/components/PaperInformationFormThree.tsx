"use client"

import { ContextStore } from '@/context/ContextStore';
import Image from 'next/image'
import React, { useContext } from 'react'

interface FormThreeProps{
  setForm1: React.Dispatch<React.SetStateAction<boolean>>;
  setForm2: React.Dispatch<React.SetStateAction<boolean>>;
  setForm3: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaperInformationFormThree = (props:FormThreeProps) => {
  const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {setBwPrint, bwPrint, colorPrint, binding, bothPrint, setColorPrint, setNextOpen, setBothPrint } = contextValues;
    const handleBwPrint = ()=>{
      setBwPrint(true); 
      setColorPrint(false); 
      setBothPrint(false)
      setNextOpen(true)
    }
    const handleColoredPrint = ()=>{
      setBwPrint(false); 
      setColorPrint(true); 
      setBothPrint(false)
      setNextOpen(true)

    }
    const handleBoth = ()=>{
      setBwPrint(false); 
      setColorPrint(false); 
      setBothPrint(true)
      setNextOpen(true)
    }
  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between'>
          <div className='mt-6 flex flex-col gap-5'>
            <div onClick={()=>handleBwPrint()} className='border flex justify-between items-center w-[360px] md:w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md hover:bg-slate-50'>
                <div className='flex items-center gap-6 '>
                    <input checked={bwPrint} type="checkbox" name="" id="" />
                    <p className='text-lg'>Black & White (Grayscale) Print</p>
                </div>
                <p className='flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300'>?</p>
            </div>
            <div onClick={()=>handleColoredPrint()} className='border flex justify-between items-center w-[360px] md:w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md hover:bg-slate-50'>
                <div className='flex items-center gap-6'>
                    <input checked={colorPrint} type="checkbox" name="" id="" />
                    <p className='text-lg'>Coloured Prints</p>
                </div>
                <p className='flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300'>?</p>
            </div>
            <div onClick={()=>handleBoth()} className='border flex justify-between items-center w-[360px] md:w-[450px] px-5 cursor-pointer py-3 rounded-xl bg-white shadow-md hover:bg-slate-50'>
                <div className='flex items-center gap-6'>
                    <input checked={bothPrint} type="checkbox" name="" id="" />
                    <p className='text-lg'>Black & White with Coloured Prints</p>
                </div>
                <p className='flex justify-center items-center rounded-[50%] w-[40px] h-[40px] text-center text-white bg-blue-300'>?</p>
            </div>
          </div>

      <Image src='/img/bookshelff.png' alt='form-img' width={350} height={200} />

      </div>
    </div>
  )
}

export default PaperInformationFormThree
