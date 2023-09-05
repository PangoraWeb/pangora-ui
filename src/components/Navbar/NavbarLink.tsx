import { Link, NavbarItem } from '@nextui-org/react'
import NextLink from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import NavbarTooltip from './NavbarTooltip'

export default function NavbarLink({
  children,
  tooltip,
  link,
  disabled,
}: {
  children: React.ReactNode
  tooltip: {
    title: string
    description: string
    key: string
  }
  link: string
  disabled?: boolean
}) {
  const pathname = usePathname()

  return (
    <NavbarItem
      isActive={link == pathname}
      className="data-[active=true]:border-b-2 border-default-500"
    >
      <NavbarTooltip tooltip={tooltip} disabled={disabled}>
        <Link
          isDisabled={disabled}
          as={NextLink}
          href={link}
          className="h-full text-default-600"
        >
          {children}
        </Link>
      </NavbarTooltip>
    </NavbarItem>
  )
}
