"use client"

import React, { useState } from 'react'
import { Nav } from './Nav'
import {
  LayoutDashboard,
  Book,
  ShoppingCartIcon,
  BanknoteIcon,
  PenBox,
  UserCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Button } from './ui/button'
import {
  useWindowWidth,
} from '@react-hook/window-size'

type Props = {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean
}

const SideBar = (props: Props) => {
  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 768;
  return (
    <div className='min-w-[60px] h-full relative border-r px-3 pt-16 flex flex-col justify-between'>
      {!mobileWidth && <div className='absolute right-[-20px] top-7'>
        <Button onClick={()=>props?.setIsCollapsed((prev) => !prev)} variant='secondary' className='rounded-full p-2'>
          {props.isCollapsed ? <ChevronRight /> : <ChevronLeft/>  }
        </Button>
      </div>}
      <Nav
            isCollapsed={mobileWidth ? true : props.isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                variant: "default",
                href: '/user'
              },
              {
                title: "Books",
                label: "",
                icon: Book,
                variant: "ghost",
                href: '/user/books',
              },
              {
                title: "Orders",
                label: "",
                icon: ShoppingCartIcon,
                variant: "ghost",
                href: '/user/orders',
              },
              {
                title: "Book Variant",
                label: "",
                icon: PenBox,
                variant: "ghost",
                href:'/user/book-variant',
              },
              {
                title: "Transactions",
                label: "",
                icon: BanknoteIcon,
                variant: "ghost",
                href:'/user/invoices',
              },
              
            ]}
          />

      <Nav
            isCollapsed={mobileWidth ? true : props.isCollapsed}
            links={[
              {
                title: "Profile",
                label: "",
                icon: UserCircle,
                variant: "ghost",
                href: '/user/profile'
              }
            ]}
              />
    </div>
  )
}

export default SideBar
