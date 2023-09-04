import { getRandomSiteTagline, getSite } from '@/shared/libs/Lemmy/site'
import TaglineNode from './TaglineNode'

export default async function Tagline() {
  const site = await getSite()
  const tagline = getRandomSiteTagline(site)

  return <TaglineNode tagline={tagline} />
}
