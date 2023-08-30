"use client"

import Image from 'next/image'
import Navbar from './components/navigation/navbar'
import Feed from './components/feed'
import Side from './components/feed/side'

import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div className='dark bg-gradient-to-tr from-blue-950 to-fuchsia-950 via-black bg-fixed'>
        <Navbar />
        <div className='flex justify-between'>
          <Feed />
          <Side />
        </div>
      </div>
    </NextUIProvider>
  )
}
