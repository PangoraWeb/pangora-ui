import NotFoundNode from '@/components/NotFoundNode'
import { getSite } from '@/shared/libs/Lemmy/site'

export default async function NotFound() {
  const site = await getSite()

  return <NotFoundNode site={site} />
}
