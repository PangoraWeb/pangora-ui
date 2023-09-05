import NavbarButton from './NavbarButton'

export default function NavbarDropdown({
  children,
  tooltip,
  disabled,
  isIconOnly,
}: {
  children: React.ReactNode
  tooltip: {
    title: string
    description: string
    key: string
  }
  disabled?: boolean
  isIconOnly?: boolean
}) {
  return (
    <NavbarButton tooltip={tooltip} isIconOnly={isIconOnly} disabled={disabled}>
      {children}
    </NavbarButton>
  )
}
