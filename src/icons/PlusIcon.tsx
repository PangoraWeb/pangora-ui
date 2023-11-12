import IconProps from '@/types/IconProps'

export default function PlusIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4.5 -4.5 24 24"
      width={width}
      fill="currentColor"
    >
      <path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"></path>
    </svg>
  )
}
