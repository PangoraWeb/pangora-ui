import IconProps from '@/types/IconProps'

export default function ScaleIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 20l10 0"></path>
      <path d="M6 6l6 -1l6 1"></path>
      <path d="M12 3l0 17"></path>
      <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0"></path>
      <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0"></path>
    </svg>
  )
}
