"use client"
import React, { useState } from 'react'
import { NavBar } from './navbar'
import Link from 'next/link'
import { ContextProvider } from '@/context/ContextStore'

interface LayoutProps {
    children: React.ReactNode;
  }

  const layout: React.FC<LayoutProps> = ({children}) => {
    const [signedIn, setSignedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
  return (
    <div>
        <ContextProvider>
            <NavBar />
            {children}
        </ContextProvider>
    </div>
  )
}

export default layout
