import IconProps from '@/types/IconProps'

export default function StarIcon({ width = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2.5 24 24"
      width={width}
      fill="currentColor"
    >
      <path d="M10 13.554l3.517 1.85-.672-3.917 2.846-2.774-3.932-.571L10 4.579 8.241 8.142l-3.932.571 2.846 2.774-.672 3.916L10 13.554zm0 2.26L3.827 19.06l1.179-6.875L.01 7.317l6.902-1.003L10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814z"></path>
    </svg>
  )
}
