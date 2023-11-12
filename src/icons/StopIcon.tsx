import IconProps from '@/types/IconProps'

export default function StopIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 24 24"
      width={width}
      fill="currentColor"
    >
      <path d="M5.094 16.32A8 8 0 0 0 16.32 5.094L5.094 16.32zM3.68 14.906L14.906 3.68A8 8 0 0 0 3.68 14.906zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
    </svg>
  )
}
