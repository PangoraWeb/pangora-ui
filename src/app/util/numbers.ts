export function compactNumber(number: number) {
  if (number > 100000) {
    return `${(number / 1000).toFixed(0)}k`
  }

  if (number > 10000) {
    return `${(number / 1000).toFixed(1)}k`
  }

  if (number > 1000) {
    return `${(number / 1000).toFixed(2)}k`
  }

  return number
}
