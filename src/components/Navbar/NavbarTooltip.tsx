import { Kbd, Tooltip } from '@nextui-org/react'

export default function NavbarTooltip({
  children,
  tooltip,
  disabled,
}: {
  children?: React.ReactNode
  tooltip: {
    title: string
    description: string
    key: string
  }
  disabled?: boolean
}) {
  return (
    <Tooltip
      isDisabled={disabled}
      showArrow
      content={
        <div className="px-1 py-2">
          <h6 className="text-sm font-bold text-default-700">
            {tooltip.title}
          </h6>
          <p className="text-xs text-default-500">{tooltip.description}</p>
          <div className="flex items-center p-1 mt-2">
            <Kbd>{tooltip.key}</Kbd>
            <p className="ml-2 text-default-300">Keybind</p>
          </div>
        </div>
      }
      delay={2000}
      className="flex"
      classNames={{
        base: 'max-w-sm bg-white dark:bg-black',
      }}
    >
      {children}
    </Tooltip>
  )
}
