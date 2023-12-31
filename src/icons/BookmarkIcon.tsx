import IconProps from '@/types/IconProps'

export default function BookmarkIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -2 24 24"
      width={width}
      fill="currentColor"
    >
      <path d="M3 2a1 1 0 0 0-1 1v15l2.978-2.717a3 3 0 0 1 4.044 0L12 18V3a1 1 0 0 0-1-1H3zm0-2h8a3 3 0 0 1 3 3v15a2 2 0 0 1-3.348 1.477L7.674 16.76a1 1 0 0 0-1.348 0l-2.978 2.717A2 2 0 0 1 0 18V3a3 3 0 0 1 3-3z"></path>
    </svg>
  )
}
