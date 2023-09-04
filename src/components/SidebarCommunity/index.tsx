import { getCommunity } from '@/shared/libs/Lemmy/community'
import SidebarCommunityNode from './SidebarCommunityNode'

export default async function SidebarCommunity({ slug }: { slug: string }) {
  const commmunity = await getCommunity({ name: slug })

  return <SidebarCommunityNode community={commmunity} />
}
