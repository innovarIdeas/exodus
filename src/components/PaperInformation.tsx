
"use client"
import PaperInformationFormOne from '@/components/PaperInformationFormOne'
import PaperInformationFormThree from '@/components/PaperInformationFormThree'
import PaperInformationFormTwo from '@/components/PaperInformationFormTwo'
import { ContextStore } from '@/context/ContextStore'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const PaperInformation = () => {
  const [form1, setForm1] = useState(true)
  const [form2, setForm2] = useState(false)
  const [form3, setForm3] = useState(false)

  const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {whitePaper, creamPaper, binding, glossyPaper, newsPrint } = contextValues;

    const handlePaperType = ()=>{
        setForm1(true) 
        setForm2(false) 
        setForm3(false)
      
    }

    const handleBinding = ()=>{
      if(whitePaper || creamPaper || glossyPaper || newsPrint){
        setForm1(false) 
        setForm2(true) 
        setForm3(false)
      }
    }

    const handlePrintType = ()=>{
      if(binding !== ''){
        setForm1(false) 
        setForm2(false) 
        setForm3(true)
      }
    }
  return (
    <div>
      <div className='text-4xl lg:text-5xl font-semi-bold my-8'>Paper Information</div>

      <div className='w-[90%] lg:w-[70%] grid grid-cols-3 shadow-md bg-white text-blue-600'>
        <p onClick={()=>handlePaperType()} className={`pl-4 border w-full h-full cursor-pointer py-4 ${form1 ? 'text-white bg-blue-500' : ''} `}>Paper Type</p>
        <p onClick={()=>handleBinding()} className={`${form2 ? 'text-white bg-blue-500' : ''} cursor-pointer pl-4 border w-full h-full py-4`}> Binding</p>
        <p onClick={()=>handlePrintType()} className={`${form3 ? 'text-white bg-blue-500' : ''} cursor-pointer pl-4 border w-full h-full py-4`}>Print Type</p>
      </div>

      {form1 ? <PaperInformationFormOne setForm1={setForm1} setForm2={setForm2} setForm3={setForm3} /> :
      form2 ? <PaperInformationFormTwo setForm1={setForm1} setForm2={setForm2} setForm3={setForm3} /> :
      <PaperInformationFormThree setForm1={setForm1} setForm2={setForm2} setForm3={setForm3} />
      }

    </div>
  )
}

export default PaperInformation
