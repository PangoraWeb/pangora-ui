import { LoginResponse } from 'lemmy-js-client'
import { serialize, parse } from 'cookie'
import { client } from '../Lemmy'

export function loginHandle(res: LoginResponse) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 365)

  console.log(isBrowser())

  if (isBrowser() && res.jwt) {
    setAuthCookie(res.jwt)
    client.setHeaders({ Authorization: `Bearer ${res.jwt}` })
  }
}

export function isBrowser() {
  return typeof window !== 'undefined'
}

export function setAuthCookie(jwt: string) {
  document.cookie = serialize('jwt', jwt, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    secure: isHttps(),
    sameSite: true,
    path: '/',
  })
}

export function getSecure() {
  return (
    isBrowser()
      ? window.location.protocol.includes('https')
      : process.env.LEMMY_UI_HTTPS === 'true'
  )
    ? 's'
    : ''
}

export function isHttps() {
  return getSecure() === 's'
}

export async function getUser() {
  const { jwt } = parse(document.cookie)

  if (jwt) {
    client.setHeaders({ Authorization: `Bearer ${jwt}` })
    return (await client.getSite()).my_user
  } else return undefined
}

export async function getAuth() {
  const { jwt } = parse(document.cookie)
  client.setHeaders({ Authorization: `Bearer ${jwt}` })
  return jwt
}

export function loggedIn() {
  return !!getUser()
}

export function logout() {
  if (isBrowser()) {
    document.cookie = serialize('jwt', '', {
      maxAge: -1,
      sameSite: true,
      path: '/',
    })
  }
}
