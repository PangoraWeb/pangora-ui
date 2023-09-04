import { getSite } from '@/shared/libs/Lemmy/site'
import SidebarSiteNode from './SidebarSiteNode'

export default async function SidebarSite() {
  const site = await getSite()

  return <SidebarSiteNode site={site} />
}
