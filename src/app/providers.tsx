'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={['light', 'dark']}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
