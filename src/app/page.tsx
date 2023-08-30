"use client"

import Image from 'next/image'
import Navbar from './components/navigation/navbar'
import Feed from './components/feed'
import Side from './components/feed/side'

import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div className='bg-gradient-to-r from-slate-700 to-slate-800 h-screen'>
        <Navbar />
        <div className='flex justify-between'>
          <Feed />
          <Side />
        </div>
      </div>
    </NextUIProvider>
  )
}
