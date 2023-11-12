import { HomeFeedDropdownItemType } from '@/types/HomeFeedDropdownItemType'
import { Button } from '@nextui-org/button'

export default function HomeFeedDropdownButton({
  item,
  selected,
  onClick,
}: {
  item: HomeFeedDropdownItemType
  selected: boolean
  onClick: () => void
}) {
  return (
    <Button
      key={item.key}
      startContent={
        <div
          className={`absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 text-white group-hover:transition-all duration-300 ease-in-out delay-75 ${
            selected && item.color
          } ${item.hoverColor}`}
        >
          {item.icon}
        </div>
      }
      size="sm"
      variant="light"
      className="group hover:transition-all hover:scale-110 scale-100 duration-300 ease-in-out delay-75 hover:-translate-y-[0.25em]"
      onClick={() => onClick()}
    >
      <div
        className={`flex items-center h-full transition-all duration-300 delay-75 ease-in-out border-b-2 border-opacity-0 ${
          selected && 'border-opacity-100'
        } ${item.borderColor || 'border-default-300'}`}
      >
        <p
          className={`group-hover:transition-all duration-300 delay-75 ease-in-out text-sm ${
            selected ? item.color : 'text-default-300'
          } ${item.hoverColor}`}
        >
          {item.name}
        </p>
      </div>
    </Button>
  )
}
