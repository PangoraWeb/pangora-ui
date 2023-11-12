export function cleanText(text: string) {
  const newText = removeMastodonPings(text)

  return newText
}

export function removeMastodonPings(text: string) {
  const [, newText] = /(?:\[@\S+\]\(\S+\)\s+)*([\s\S]*)/.exec(text) || []

  return newText
}
