import {
  CommunityModeratorView,
  GetPersonDetails,
  GetPersonMentions,
  Person,
  PersonView,
} from 'lemmy-js-client'
import { client } from '.'
import { cleanText } from '../Text'

// --- API Functions -----------------------------------------------------------

export function getPersonDetails(form: GetPersonDetails) {
  return client.getPersonDetails(form)
}

export function getPersonMentions(form: GetPersonMentions) {
  return client.getPersonMentions(form)
}

export function login(username: string, password: string) {
  return client.login({ username_or_email: username, password: password })
}

export function signup(username: string, password: string) {
  return client.register({
    username: username,
    password: password,
    password_verify: password,
    show_nsfw: true,
  })
}

// --- Object Functions --------------------------------------------------------

export function getPersonTag(
  person: Person | PersonView | CommunityModeratorView
): string {
  const link = getPersonLink(person)
  const [, instance, user] = /:\/\/(.+)\/.+\/(.+)/.exec(link) || []

  return `${user}@${instance}`
}

export function getPersonName(
  person: Person | PersonView | CommunityModeratorView
): string {
  switch (getPersonObjectType(person)) {
    case 'PersonView': {
      const typedPerson = person as PersonView
      return typedPerson.person.display_name || typedPerson.person.name
    }
    case 'Person': {
      const typedPerson = person as Person
      return typedPerson.display_name || typedPerson.name
    }
    case 'CommunityModeratorView': {
      const typedPerson = person as CommunityModeratorView
      return typedPerson.moderator.display_name || typedPerson.moderator.name
    }
  }
}

export function getPersonBio(
  person: Person | PersonView | CommunityModeratorView,
  maxLength?: number
): string {
  let content = ''
  switch (getPersonObjectType(person)) {
    case 'PersonView': {
      const typedPerson = person as PersonView
      content = typedPerson.person.bio || ''
      break
    }
    case 'Person': {
      const typedPerson = person as Person
      content = typedPerson.bio || ''
      break
    }
    case 'CommunityModeratorView': {
      const typedPerson = person as CommunityModeratorView
      content = typedPerson.moderator.bio || ''
      break
    }
  }

  content = cleanText(content)

  if (maxLength && content.length > maxLength) {
    return content.slice(0, maxLength) + '...'
  }

  return content
}

export function getPersonLink(
  person: Person | PersonView | CommunityModeratorView
): string {
  switch (getPersonObjectType(person)) {
    case 'PersonView': {
      const typedPerson = person as PersonView
      return typedPerson.person.actor_id
    }
    case 'Person': {
      const typedPerson = person as Person
      return typedPerson.actor_id
    }
    case 'CommunityModeratorView': {
      const typedPerson = person as CommunityModeratorView
      return typedPerson.moderator.actor_id
    }
  }
}

export function getRelativePersonLink(
  person: Person | PersonView | CommunityModeratorView
): string {
  const personLocal = getPersonLocal(person)
  const personLink = getPersonLink(person)

  if (personLocal) {
    const [, name] = /.*:\/\/.*(\/u\/.*)/.exec(personLink) || []

    return name
  } else {
    const [, instance, name] = /.*:\/\/(.*)(\/u\/.*)/.exec(personLink) || []

    return `${name}@${instance}`
  }
}

export function getPersonAvatar(
  person: Person | PersonView | CommunityModeratorView
): string {
  switch (getPersonObjectType(person)) {
    case 'PersonView': {
      const typedPerson = person as PersonView
      return typedPerson.person.avatar || getDefaultPersonAvatar()
    }
    case 'Person': {
      const typedPerson = person as Person
      return typedPerson.avatar || getDefaultPersonAvatar()
    }
    case 'CommunityModeratorView': {
      const typedPerson = person as CommunityModeratorView
      return typedPerson.moderator.avatar || getDefaultPersonAvatar()
    }
  }
}

export function getDefaultPersonAvatar(): string {
  return '/massiveMultiplayer.png'
}

export function getPersonLocal(
  person: Person | PersonView | CommunityModeratorView
): boolean {
  switch (getPersonObjectType(person)) {
    case 'PersonView': {
      const typedPerson = person as PersonView
      return typedPerson.person.local
    }
    case 'Person': {
      const typedPerson = person as Person
      return typedPerson.local
    }
    case 'CommunityModeratorView': {
      const typedPerson = person as CommunityModeratorView
      return typedPerson.moderator.local
    }
  }
}

// --- Helper Functions --------------------------------------------------------

function getPersonObjectType(
  person: Person | PersonView | CommunityModeratorView
) {
  if ((person as PersonView).person) {
    return 'PersonView'
  } else if ((person as CommunityModeratorView).moderator) {
    return 'CommunityModeratorView'
  } else {
    return 'Person'
  }
}
