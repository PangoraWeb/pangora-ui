export function getIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomElement<T>(array: T[]): T {
  return array[getIntBetween(0, array.length)]
}
