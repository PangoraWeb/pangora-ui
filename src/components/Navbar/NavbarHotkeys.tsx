'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { useState } from 'react'

export default function NavbarHotkeys() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [themeCooldown, setThemeCooldown] = useState(false)

  // -- First Row --------------------------------------------------------------
  useHotkeys('z', () => router.push('/'))
  useHotkeys('x', () => router.push('/communities'))
  useHotkeys('c', () => router.push('/create_post'))
  useHotkeys('v', () => router.push('/c/community_request'))
  useHotkeys('b', () => router.push('/donate'))
  useHotkeys('n', () => router.push('/inbox'))
  useHotkeys('m', () => router.push('/reports'))

  // -- Second Row -------------------------------------------------------------
  useHotkeys('s', (event) => {
    //searchBar.current?.focus()
    event.preventDefault()
    event.stopPropagation()
  })
  useHotkeys('d', () => {
    //searchCategoryButton.current?.click()
  })
  useHotkeys('j', () => router.push('/registration_applications'))
  useHotkeys('k', () => router.push('/settings'))
  useHotkeys('l', () => router.push('/admin'))

  // -- Third Row --------------------------------------------------------------
  useHotkeys('q', () => {
    if (themeCooldown) return

    setThemeCooldown(true)

    setTimeout(() => {
      setThemeCooldown(false)
    }, 500)

    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  })
  useHotkeys('u', () => router.push('/terms'))
  useHotkeys('i', () => router.push('/info'))
  //useHotkeys('o', () => router.push('/logout'))
  //useHotkeys('p', () => router.push('/u/Ategon'))
  useHotkeys('o', () => router.push('/login'))
  useHotkeys('p', () => router.push('/u/signup'))

  return null
}
