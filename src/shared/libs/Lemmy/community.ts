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

export function getCommunityIcon(community: CommunityView): string {
  return community.community.icon || ''
}

export function getCommunityLink(community: CommunityView | Community): string {
  if ((<CommunityView>community).community) {
    return (community as CommunityView).community.actor_id
  } else {
    return (community as Community).actor_id
  }
}

export function getRelativeCommunityLink(
  community: CommunityView | Community
): string {
  if ((<CommunityView>community).community) {
    if ((<CommunityView>community).community.local) {
      const [, link] =
        /.*:\/\/.*(\/c\/.*)/.exec(
          (community as CommunityView).community.actor_id
        ) || []

      return link
    } else {
      const [, instance, link] =
        /.*:\/\/(.*)(\/c\/.*)/.exec(
          (community as CommunityView).community.actor_id
        ) || []

      return `${link}@${instance}`
    }
  } else {
    if ((<Community>community).local) {
      const [, link] =
        /.*:\/\/.*(\/c\/.*)/.exec((community as Community).actor_id) || []

      return link
    } else {
      const [, instance, link] =
        /.*:\/\/(.*)(\/c\/.*)/.exec((community as Community).actor_id) || []

      return `${link}@${instance}`
    }
  }
}

export function getCommunityDescription(community: CommunityView): string {
  return community.community.description || ''
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
