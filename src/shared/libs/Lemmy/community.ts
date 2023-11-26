import {
  Community,
  CommunityView,
  GetCommunity,
  GetCommunityResponse,
  ListCommunities,
  ListCommunitiesResponse,
} from 'lemmy-js-client'
import { client } from '.'
import { differenceInDays } from 'date-fns'
import { getAuth } from '../Users'
import { cleanText } from '../Text'
import { getRelativeTimeText } from '../Time'

const communityColorMap = new Map()
communityColorMap.set('godot', ['rgb(0, 204, 255)', 'rgb(0, 0, 255)'])
communityColorMap.set('_', ['rgb(0, 204, 255)', 'rgb(153, 51, 255)'])
communityColorMap.set('git', ['rgb(255, 102, 0)', 'rgb(228, 47, 27)'])
communityColorMap.set('pangora', ['rgb(34,195,97)', 'rgb(176,195,34)'])
communityColorMap.set('programmer_humor', [
  'rgb(208,207,44)',
  'rgb(44,175,208)',
])

export async function getCommunities(
  form?: ListCommunities
): Promise<ListCommunitiesResponse> {
  return client.listCommunities(form)
}

export async function getCommunity(
  form?: GetCommunity
): Promise<GetCommunityResponse> {
  return client.getCommunity(form)
}

export function getCommunityId(community: CommunityView): number {
  return community.community.id
}

export function getCommunityName(community: CommunityView | Community): string {
  if ((<CommunityView>community).community) {
    return (community as CommunityView).community.title
  } else {
    return (community as Community).title
  }
}

export function getCommunityInstance(
  community: CommunityView | Community
): string {
  if ((<CommunityView>community).community) {
    const [, instance] =
      /.*:\/\/(.*)\/c\//.exec(
        (community as CommunityView).community.actor_id
      ) || []
    return instance
  } else {
    const [, instance] =
      /.*:\/\/(.*)\/c\//.exec((community as Community).actor_id) || []
    return instance
  }
}

export function getCommunityIcon(community: CommunityView | Community): string {
  if ((<CommunityView>community).community) {
    return (
      (community as CommunityView).community.icon || getDefaultCommunityIcon()
    )
  } else {
    return (community as Community).icon || getDefaultCommunityIcon()
  }
}

export function getDefaultCommunityIcon(): string {
  return '/massiveMultiplayer.png'
}

export function getCommunityBanner(
  community: CommunityView | Community
): string {
  if ((<CommunityView>community).community) {
    return (community as CommunityView).community.banner || ''
  } else {
    return (community as Community).banner || ''
  }
}

export function getCommunityLocal(
  community: CommunityView | Community
): boolean {
  if ((<CommunityView>community).community) {
    return (community as CommunityView).community.local
  } else {
    return (community as Community).local
  }
}

export function getCommunityLink(community: CommunityView | Community): string {
  if ((<CommunityView>community).community) {
    return (community as CommunityView).community.actor_id
  } else {
    return (community as Community).actor_id
  }
}

export function getRelativeCommunityLink(
  community: CommunityView | Community,
  addExlamation?: boolean
): string {
  if ((<CommunityView>community).community) {
    if ((<CommunityView>community).community.local) {
      const [, link] =
        /.*:\/\/.*(\/c\/.*)/.exec(
          (community as CommunityView).community.actor_id
        ) || []

      return addExlamation ? `!${link}` : link
    } else {
      const [, instance, link] =
        /.*:\/\/(.*)(\/c\/.*)/.exec(
          (community as CommunityView).community.actor_id
        ) || []

      return addExlamation ? `!${link}@${instance}` : `${link}@${instance}`
    }
  } else {
    if ((<Community>community).local) {
      const [, link] =
        /.*:\/\/.*(\/c\/.*)/.exec((community as Community).actor_id) || []

      return addExlamation ? `!${link}` : link
    } else {
      const [, instance, link] =
        /.*:\/\/(.*)(\/c\/.*)/.exec((community as Community).actor_id) || []

      return addExlamation ? `!${link}@${instance}` : `${link}@${instance}`
    }
  }
}

export function getCommunityTag(
  community: CommunityView | Community,
  addExlamation?: boolean
): string {
  if ((<CommunityView>community).community) {
    if ((<CommunityView>community).community.local) {
      const [, link] =
        /.*:\/\/.*\/c\/(.*)/.exec(
          (community as CommunityView).community.actor_id
        ) || []

      return addExlamation ? `!${link}` : link
    } else {
      const [, instance, link] =
        /.*:\/\/(.*)\/c\/(.*)/.exec(
          (community as CommunityView).community.actor_id
        ) || []

      return addExlamation ? `!${link}@${instance}` : `${link}@${instance}`
    }
  } else {
    if ((<Community>community).local) {
      const [, link] =
        /.*:\/\/.*\/c\/(.*)/.exec((community as Community).actor_id) || []

      return addExlamation ? `!${link}` : link
    } else {
      const [, instance, link] =
        /.*:\/\/(.*)\/c\/(.*)/.exec((community as Community).actor_id) || []

      return addExlamation ? `!${link}@${instance}` : `${link}@${instance}`
    }
  }
}

export function getCommunityDescription(
  community: CommunityType,
  maxLength?: number
): string {
  let content = ''
  switch (getCommunityObjectType(community)) {
    case 'CommunityView': {
      const typed = community as CommunityView
      content = typed.community.description || ''
      break
    }
    case 'Community': {
      const typed = community as Community
      content = typed.description || ''
      break
    }
  }

  content = cleanText(content)

  if (maxLength && content.length > maxLength) {
    return content.slice(0, maxLength) + '...'
  }

  return content
}

export function getCommunitySubscribers(community: CommunityView): number {
  return community.counts.subscribers
}

export function getCommunityUsersMonth(community: CommunityView): number {
  return community.counts.users_active_month
}

export function getCommunityPostAmount(community: CommunityView): number {
  return community.counts.posts
}

export function getCommunityCommentAmount(community: CommunityView): number {
  return community.counts.comments
}

export function getCommunityHidden(community: CommunityView): boolean {
  return community.community.hidden
}

export function getCommunityUsersHalfYear(community: CommunityView): number {
  return community.counts.users_active_half_year
}

export function getCommunityUsersDay(community: CommunityView): number {
  return community.counts.users_active_day
}

export function getCommunityUsersWeek(community: CommunityView): number {
  return community.counts.users_active_week
}

export function getCommunityNew(community: CommunityView): boolean {
  const published = community.community.published

  return differenceInDays(Date.now(), new Date(published)) < 7
}

export function getCommunityOuterNew(community: CommunityView): boolean {
  const published = community.community.published

  return differenceInDays(Date.now(), new Date(published)) < 31
}

export function getCommunityTime(community: CommunityView): string {
  return getRelativeTimeText(community.community.published)
}

export function getCommunityPrimaryColor(community: Community): string {
  if (communityColorMap.has(community.name)) {
    return communityColorMap.get(community.name)[0]
  }

  return communityColorMap.get('_')[0]
}

export function getCommunitySecondaryColor(community: Community): string {
  if (communityColorMap.has(community.name)) {
    return communityColorMap.get(community.name)[1]
  }

  return communityColorMap.get('_')[1]
}

export function isCommunityIn(
  community: CommunityView,
  communities: CommunityView[]
): boolean {
  return (
    communities.findIndex((c) => community.community.id === c.community.id) !==
    -1
  )
}

export async function hideCommunity(community: CommunityView) {
  const auth = await getAuth()

  const data = {
    community_id: community.community.id,
    hidden: true,
    auth: auth,
  }
  const json = JSON.stringify(data)

  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this)
    }
  }
  xhttp.open('PUT', 'http://programming.dev/api/v3/community/hide', true)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(json)
}

// --- Helper Functions --------------------------------------------------------

function getCommunityObjectType(community: Community | CommunityView) {
  if ((community as CommunityView).community) {
    return 'CommunityView'
  } else {
    return 'Community'
  }
}

type CommunityType = CommunityView | Community
