import { EditSite, GetSiteResponse, PersonView, Tagline } from 'lemmy-js-client'
import { getRandomElement } from '../Random'
import { client } from '.'
import { cache } from 'react'

export const revalidate = 3600

// --- API Functions -----------------------------------------------------------

export const getSite = cache(async () => {
  return client.getSite()
})

export const editSite = cache(async (form: EditSite) => {
  return client.editSite(form)
})

export const getFederatedSites = cache(async () => {
  return client.getFederatedInstances()
})

/*export async function getSite(): Promise<GetSiteResponse> {
  return client.getSite()
}

export async function editSite(form: EditSite) {
  client.editSite(form)
}*/

// --- Object Functions --------------------------------------------------------

export function getRandomSiteTagline(
  site: GetSiteResponse
): Tagline | undefined {
  if (!site.taglines) return
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

export function getSiteDescription(site: GetSiteResponse): string {
  return site.site_view.site.description || ''
}

export function getSiteSidebar(site: GetSiteResponse): string {
  return site.site_view.site.sidebar || ''
}

export function getSiteLegal(site: GetSiteResponse): string {
  return site.site_view.local_site.legal_information || ''
}

export function getSiteEnabledDownvotes(site: GetSiteResponse): boolean {
  return site.site_view.local_site.enable_downvotes
}

export function getSiteEnabledNSFW(site: GetSiteResponse): boolean {
  return site.site_view.local_site.enable_nsfw
}

export function getSiteCommunityCreationAdminOnly(
  site: GetSiteResponse
): boolean {
  return site.site_view.local_site.community_creation_admin_only
}

export function getSiteRequireEmailVerification(
  site: GetSiteResponse
): boolean {
  return site.site_view.local_site.require_email_verification
}

export function getSiteEmailAdminsApplication(site: GetSiteResponse): boolean {
  return site.site_view.local_site.application_email_admins
}

export function getSiteEmailAdminsReports(site: GetSiteResponse): boolean {
  return site.site_view.local_site.reports_email_admins
}

export function getSitePrivate(site: GetSiteResponse): boolean {
  return site.site_view.local_site.private_instance
}

export function getSiteHideModlogModNames(site: GetSiteResponse): boolean {
  return site.site_view.local_site.hide_modlog_mod_names
}

export function getSiteFederationEnabled(site: GetSiteResponse): boolean {
  return site.site_view.local_site.federation_enabled
}

export function getSiteCaptchaEnabled(site: GetSiteResponse): boolean {
  return site.site_view.local_site.captcha_enabled
}

// TODO: Add default site icon
export function getSiteIcon(site: GetSiteResponse): string {
  return site.site_view.site.icon || ''
}

export function getSiteBanner(site: GetSiteResponse): string {
  return site.site_view.site.banner || ''
}

export function getSiteCommunityAmount(site: GetSiteResponse): number {
  return site.site_view.counts.communities
}
