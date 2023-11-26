'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        themes={['system', 'light', 'dark']}
      >
        <Toaster theme="dark" richColors />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
