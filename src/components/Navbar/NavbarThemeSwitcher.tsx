'use client'

import { useTheme } from 'next-themes'
import NavbarButton from './NavbarButton'
import MoonIcon from '@/icons/MoonIcon'
import SunMoonIcon from '@/icons/SunMoonIcon'
import SunIcon from '@/icons/SunIcon'
import { useEffect, useState } from 'react'

export default function NavbarThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div>
      {isMounted && (
        <NavbarButton
          isIconOnly
          onClick={() => {
            if (theme === 'dark') {
              setTheme('light')
            } else if (theme === 'light') {
              setTheme('system')
            } else {
              setTheme('dark')
            }
          }}
          tooltip={{
            title: 'Theme',
            description: 'Toggle the site between light and dark themes.',
            key: 'Q',
          }}
        >
          {theme === 'dark' ? (
            <MoonIcon />
          ) : theme === 'light' ? (
            <SunIcon />
          ) : (
            <SunMoonIcon />
          )}
        </NavbarButton>
      )}
    </div>
  )
}
