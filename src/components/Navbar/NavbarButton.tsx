import { Button, NavbarItem } from '@nextui-org/react'
import NavbarTooltip from './NavbarTooltip'
import { MouseEventHandler } from 'react'

export default function NavbarButton({
  children,
  tooltip,
  disabled,
  isIconOnly,
  onClick,
}: {
  children: React.ReactNode
  tooltip: {
    title: string
    description: string
    key: string
  }
  disabled?: boolean
  isIconOnly?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <NavbarItem className="data-[active=true]:border-b-2 border-blue-500">
      <NavbarTooltip tooltip={tooltip} disabled={disabled}>
        <Button isIconOnly={isIconOnly} onClick={onClick}>
          {children}
        </Button>
      </NavbarTooltip>
    </NavbarItem>
  )
}
