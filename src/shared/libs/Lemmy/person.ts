import { Person } from 'lemmy-js-client'
import { client } from '.'

export function getPersonTag(person: Person) {
  const [, instance, user] = /:\/\/(.+)\/.+\/(.+)/.exec(person.actor_id) || []

  return `${user}@${instance}`
}

export function login(username: string, password: string) {
  return client.login({ username_or_email: username, password: password })
}
