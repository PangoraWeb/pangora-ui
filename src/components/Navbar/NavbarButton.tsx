import { Button, Card, NavbarItem } from '@nextui-org/react'
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
    <NavbarItem>
      <NavbarTooltip tooltip={tooltip} disabled={disabled}>
        <Card isBlurred className="w-full h-[65%]">
          <Button
            isIconOnly={isIconOnly}
            onClick={onClick}
            variant="light"
            className="h-full data-[hover=true]:bg-transparent data-[hover=true]:text-default-500 text-default-600"
            disableRipple
          >
            {children}
          </Button>
        </Card>
      </NavbarTooltip>
    </NavbarItem>
  )
}
