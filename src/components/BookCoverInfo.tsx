"use client"
import { ContextStore } from '@/context/ContextStore';
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const BookCoverInfo = () => {
    const [spotLamination, setSpotLamination] = useState(false)
    const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {embossing, setEmbossing, isbn, setIsbn, foiling, setFoiling, lamination, setLamination, } = contextValues;
  return (
    <div>
      <div>
        <h2 className='text-4xl font-semibold my-5'>Book Cover Information</h2>
        <div className='grid md:grid-cols-2 gap-y-10 my-8'>
            <div>
                <p>Do you need ISBN?</p>
                <div className='w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400'>
                    <button onClick={()=>(setIsbn(true))} className={`py-3  rounded-lg ${isbn ? 'bg-blue-800 text-white' : ''}`}>Yes</button>
                    <button onClick={()=>(setIsbn(false))} className={`py-3 rounded-lg ${!isbn ? 'bg-blue-800 text-white' : ''}`}>No</button>
                </div>
            </div>
            <div>
                <p>Embossing?</p>
                <div className='w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400'>
                    <button onClick={()=>setEmbossing(true)} className={`py-3 rounded-lg ${embossing ? 'bg-blue-800 text-white' : ''}`}>Yes</button>
                    <button onClick={()=>setEmbossing(false)} className={`py-3 rounded-lg ${!embossing ? 'bg-blue-800 text-white' : ''}`}>No</button>
                </div>
            </div>
            <div>
                <p>Foiling?</p>
                <div className='w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400'>
                    <button onClick={()=>setFoiling(true)} className={`py-3 rounded-lg ${foiling ? 'bg-blue-800 text-white' : ''}`}>Yes</button>
                    <button onClick={()=>setFoiling(false)} className={`py-3 rounded-lg ${!foiling ? 'bg-blue-800 text-white' : ''}`}>No</button>
                </div>
            </div>
            {spotLamination &&<div>
                <p>Spot Lamination?</p>
                <div className='w-[360px] border shadow-md p-2 grid grid-cols-2 rounded-md bg-white border-gray-400'>
                    <button onClick={()=>setLamination('Spot Lamination')} className={`py-3 rounded-lg ${lamination === 'Spot Lamination' ? 'bg-blue-800 text-white' : ''}`}>Yes</button>
                    <button onClick={()=>setLamination('')} className={`py-3 rounded-lg ${lamination === '' ? 'bg-blue-800 text-white' : ''}`}>No</button>
                </div>
            </div>}
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 lg:items-end my-14'>
            <div className='cursor-pointer'>
                <p className='font-semibold text-gray-600'>Lamination</p>
                <div onClick={()=>{setLamination('Glossy Lamination'); setSpotLamination(false)}} className={`${lamination === 'Glossy Lamination' && 'border-2 shadow-md p-1'}`}>
                    <Image src='/img/gloss.png' alt='gloss-img' width={200} height={120} />
                </div>
            </div>
            <div className='cursor-pointer'>
                <div onClick={()=>{setSpotLamination(true); setLamination('')}} className={`${spotLamination && 'border-2 shadow-md p-1'}`}>
                    <Image src='/img/matte.png' alt='matte-img' width={200} height={120} />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BookCoverInfo
