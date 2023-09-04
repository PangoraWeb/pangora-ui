import { GetSite, GetSiteResponse, PersonView, Tagline } from 'lemmy-js-client'
import { getRandomElement } from '../Random'
import { client } from '.'

export async function getSite(form?: GetSite): Promise<GetSiteResponse> {
  return client.getSite(form)
}

export function getRandomSiteTagline(site: GetSiteResponse): Tagline {
  return getRandomElement(site.taglines)
}

export function getSiteAdmins(site: GetSiteResponse): PersonView[] {
  return site.admins.filter((admin) => !admin.person.bot_account)
}

export function getSiteVersion(site: GetSiteResponse): string {
  return site.version
}

export function getSiteName(site: GetSiteResponse): string {
  return site.site_view.site.name
}

// TODO: Add default site icon
export function getSiteIcon(site: GetSiteResponse): string {
  return site.site_view.site.icon || ''
}

export function getSiteCommunityAmount(site: GetSiteResponse): number {
  return site.site_view.counts.communities
}
