import { Button } from '@nextui-org/button'
import { Tooltip } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function CommentActionButton({
  children,
  selected,
  onClick,
  color,
  name,
}: {
  children: ReactNode
  selected: boolean
  onClick?: () => void
  color: string
  name: string
}) {
  return (
    <Tooltip content={name} closeDelay={300}>
      <Button
        isIconOnly
        variant="light"
        className="group hover:transition-all text-default-500 dark:text-default-300 hover:rotate-6 hover:scale-110 scale-100 duration-300 ease-in-out delay-75 hover:-translate-y-[0.25em]"
        onClick={() => {
          if (onClick) onClick()
        }}
      >
        <div
          className={`flex items-center h-full transition-all duration-300 delay-75 ease-in-out border-blue-400 border-opacity-0 border-b-2  ${
            selected && 'border-opacity-100'
          }`}
        >
          <div
            className={`group-hover:transition-all duration-300 delay-75 ease-in-out ${
              selected
                ? 'text-blue-500 group-hover:text-blue-400 font-bold '
                : color
            }`}
          >
            {children}
          </div>
        </div>
      </Button>
    </Tooltip>
  )
}
