import { Person } from 'lemmy-js-client'

export function getPersonTag(person: Person) {
  const [, instance, user] = /:\/\/(.+)\/.+\/(.+)/.exec(person.actor_id) || []

  return `${user}@${instance}`
}
