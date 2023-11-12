import IconProps from '@/types/IconProps'

export default function ArrowBackUpIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 14l-4 -4l4 -4"></path>
      <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
    </svg>
  )
}
