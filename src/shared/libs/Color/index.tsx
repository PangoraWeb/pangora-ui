export type Color =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'default'

export function getBackgroundColor(color: Color) {
  switch (color) {
    case 'red':
      return 'bg-red-950'
    case 'orange':
      return 'bg-orange-950'
    case 'amber':
      return 'bg-amber-950'
    case 'yellow':
      return 'bg-yellow-950'
    case 'lime':
      return 'bg-lime-950'
    case 'green':
      return 'bg-green-950'
    case 'emerald':
      return 'bg-emerald-950'
    case 'teal':
      return 'bg-teal-950'
    case 'cyan':
      return 'bg-cyan-950'
    case 'sky':
      return 'bg-sky-950'
    case 'blue':
      return 'bg-blue-950'
    case 'indigo':
      return 'bg-indigo-950'
    case 'violet':
      return 'bg-violet-950'
    case 'purple':
      return 'bg-purple-950'
    case 'fuchsia':
      return 'bg-fuchsia-950'
    case 'pink':
      return 'bg-pink-950'
    case 'rose':
      return 'bg-rose-950'
    case 'default':
    default:
      return 'bg-default-950'
  }
}

export function getTextColor(color: Color) {
  switch (color) {
    case 'red':
      return 'text-red-400'
    case 'orange':
      return 'text-orange-400'
    case 'amber':
      return 'text-amber-400'
    case 'yellow':
      return 'text-yellow-400'
    case 'lime':
      return 'text-lime-400'
    case 'green':
      return 'text-green-400'
    case 'emerald':
      return 'text-emerald-400'
    case 'teal':
      return 'text-teal-400'
    case 'cyan':
      return 'text-cyan-400'
    case 'sky':
      return 'text-sky-400'
    case 'blue':
      return 'text-blue-400'
    case 'indigo':
      return 'text-indigo-400'
    case 'violet':
      return 'text-violet-400'
    case 'purple':
      return 'text-purple-400'
    case 'fuchsia':
      return 'text-fuchsia-400'
    case 'pink':
      return 'text-pink-400'
    case 'rose':
      return 'text-rose-400'
    case 'default':
    default:
      return 'text-default-400'
  }
}

export function getBorderColor(color: Color) {
  switch (color) {
    case 'red':
      return 'border-red-400'
    case 'orange':
      return 'border-orange-400'
    case 'amber':
      return 'border-amber-400'
    case 'yellow':
      return 'border-yellow-400'
    case 'lime':
      return 'border-lime-400'
    case 'green':
      return 'border-green-400'
    case 'emerald':
      return 'border-emerald-400'
    case 'teal':
      return 'border-teal-400'
    case 'cyan':
      return 'border-cyan-400'
    case 'sky':
      return 'border-sky-400'
    case 'blue':
      return 'border-blue-400'
    case 'indigo':
      return 'border-indigo-400'
    case 'violet':
      return 'border-violet-400'
    case 'purple':
      return 'border-purple-400'
    case 'fuchsia':
      return 'border-fuchsia-400'
    case 'pink':
      return 'border-pink-400'
    case 'rose':
      return 'border-rose-400'
    case 'default':
    default:
      return 'border-default-400'
  }
}
