'use server'

import { getSite } from '@/shared/libs/Lemmy/site'
import SidebarSiteNode from './SidebarSiteNode'

export default async function SidebarSite({
  startButtonsShown = false,
}: {
  startButtonsShown?: boolean
}) {
  const site = await getSite()

  return <SidebarSiteNode startButtonsShown={startButtonsShown} site={site} />
}
