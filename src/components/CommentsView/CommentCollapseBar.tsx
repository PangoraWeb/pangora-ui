import { Button } from '@nextui-org/react'

const depthColors = [
  'dark:bg-red-950 bg-red-400',
  'dark:bg-amber-950 bg-amber-400',
  'dark:bg-lime-950 bg-lime-400',
  'dark:bg-emerald-950 bg-emerald-400',
  'dark:bg-cyan-950 bg-cyan-400',
  'dark:bg-blue-950 bg-blue-400',
  'dark:bg-violet-950 bg-violet-400',
  'dark:bg-fuchsia-950 bg-fuchsia-400',
  'dark:bg-rose-950 bg-rose-400',
]

export function CommentCollapseBar({
  onClick,
  depth,
}: {
  onClick: () => void
  depth: number
}) {
  return (
    <Button
      className={`w-2 min-w-2 h-[100%] min-h-[100%] max-h-[100%] p-0 text-xs text-default-500 ${
        depth && depthColors[depth - 2]
      }`}
      onClick={() => onClick()}
    ></Button>
  )
}
