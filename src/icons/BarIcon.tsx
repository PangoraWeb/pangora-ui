import IconProps from '@/types/IconProps'

export default function BarIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -4 24 24"
      width={width}
      fill="currentColor"
    >
      <path d="M1 0a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm12 4a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zM7 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path>
    </svg>
  )
}
