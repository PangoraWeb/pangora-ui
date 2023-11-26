import IconProps from '@/types/IconProps'

export default function SunMoonIcon({ width = 24 }: IconProps) {
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
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9.173 14.83a4 4 0 1 1 5.657 -5.657" />
      <path d="M11.294 12.707l.174 .247a7.5 7.5 0 0 0 8.845 2.492a9 9 0 0 1 -14.671 2.914" />
      <path d="M3 12h1" />
      <path d="M12 3v1" />
      <path d="M5.6 5.6l.7 .7" />
      <path d="M3 21l18 -18" />
    </svg>
  )
}
