import IconProps from '@/types/IconProps'

export default function FlagIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -2 24 24"
      width={width}
      fill="currentColor"
    >
      <path d="M2 1h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H2v7a1 1 0 0 1-2 0V1a1 1 0 1 1 2 0zm0 9h12V3H2v7z"></path>
    </svg>
  )
}
