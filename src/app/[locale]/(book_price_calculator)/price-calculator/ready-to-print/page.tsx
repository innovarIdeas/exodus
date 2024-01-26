"use client"
import React, { useContext } from 'react'
import PaperInformation from '@/components/PaperInformation'
import BookPageInfo from '@/components/BookPageInfo'
import BookCoverInfo from '@/components/BookCoverInfo'
import DeliveryOption from '@/components/DeliveryOption'
import ConfirmOrder from '@/components/ConfirmOrder'
import { ContextStore } from '@/context/ContextStore'

const ReadyToPrint = () => {
  const contextValues = useContext(ContextStore)
    if (!contextValues) {
        return null;
      }
    const {setCurrentStep, currentStep } = contextValues;
  return (
    <div style={{ backgroundImage: 'url("/img/bg_light.png")' }} className='lg:ml-[20%] px-6 md:px-24 pt-10 h-full overflow-hidden'>
      <div className='flex mx-auto bg-white py-6 px-8 mt-24 lg:mt-auto shadow-lg gap-5'>
        <p>Project Name: </p>
        <p>Project Type: </p>
        <p>Project Readiness: </p>
      </div>

      {currentStep === 1 && <PaperInformation />}
      {currentStep === 2 && <BookPageInfo />}
      {currentStep === 3 && <BookCoverInfo />}
      {currentStep === 4 && <DeliveryOption />}
      {currentStep === 5 && <ConfirmOrder />}

    </div>
  )
}

export default ReadyToPrint
