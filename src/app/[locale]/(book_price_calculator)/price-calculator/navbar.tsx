'use client'

import Image from "next/image"
import { useState } from "react"

export const NavBar =(props:any)=>{
    const [showMobileMenu, setShowMobileMenu]= useState(false)

    return (
    <nav className="flex bg-slate-50 justify-between border shadow-md py-5 px-28 sticky top-0 z-50">
        <Image src='/img/magicwand.png' alt="logo" width={120} height={120} />
        <div className="flex gap-4 items-center">
            <button className="bg-blue-800 text-sm font-semibold text-white py-2 px-4 rounded-lg">Create a new book</button>
            <p className="font-semibold">Sign in</p>
        </div>
    </nav>
    )
}