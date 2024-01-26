"use client"

import { ContextStore } from '@/context/ContextStore';
import Image from 'next/image'
import React, { useContext } from 'react'

interface FormTwoProps{
  setForm1: React.Dispatch<React.SetStateAction<boolean>>;
  setForm2: React.Dispatch<React.SetStateAction<boolean>>;
  setForm3: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaperInformationFormTwo = (props:FormTwoProps) => {
  const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {setBinding, binding } = contextValues;

    const moveToNextForm = (val:string)=>{
      setBinding(val)

      setTimeout(() => {
        props.setForm1(false)
        props.setForm2(false)
        props.setForm3(true)
      }, 1000);
      
    }
  return (
    <div className='flex flex-col md:flex-row items-center my-10'>
      <div className='grid md:grid-cols-2 gap-8 p-4 md:w-[60%]'>
          <div onClick={()=> {moveToNextForm('Perfect Binding')}} className='flex cursor-pointer flex-col xl:flex-row gap-6 border shadow-md p-6 relative bg-white rounded-lg hover:bg-slate-50'>
            <Image src='/img/paper_binding.jpg' alt='paper-binding-img' width={80} height={80} />
            <p className='text-lg font-semibold'>Perfect Binding</p>
            <input checked={binding==='Perfect Binding'} type="checkbox" name="" id="" className='absolute bottom-2 right-2' />
          </div>
          <div onClick={()=>{moveToNextForm('Staple Binding')}} className='flex cursor-pointer flex-col xl:flex-row gap-6 border shadow-md p-6 relative bg-white rounded-lg hover:bg-slate-50'>
            <Image src='/img/staple_binding.jpg' alt='paper-binding-img' width={80} height={80} />
            <p className='text-lg font-semibold'>Staple Binding</p>
            <input checked={binding=== 'Staple Binding'} type="checkbox" name="" id="" className='absolute bottom-2 right-2' />
          </div>
          <div onClick={()=>{moveToNextForm('Hard Back')}} className='flex cursor-pointer flex-col xl:flex-row gap-6 border shadow-md p-6 relative bg-white rounded-lg hover:bg-slate-50'>
            <Image src='/img/hard_cover_binding.png' alt='paper-binding-img' width={80} height={80} className='' />
            <p className='text-lg font-semibold'>Hard Back</p>
            <input checked={binding==='Hard Back'} type="checkbox" name="" id="" className='absolute bottom-2 right-2' />
          </div>
      </div>
      <Image src='/img/bookshelff.png' alt='form-img' width={300} height={300} className='opacity-50' />
      
    </div>
  )
}

export default PaperInformationFormTwo
