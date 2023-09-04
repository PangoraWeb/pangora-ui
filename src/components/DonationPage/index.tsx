import { getSite } from '@/shared/libs/Lemmy/site'
import DonationPageNode from './DonationPageNode'

export default async function DonationPage() {
  const site = await getSite()

  return <DonationPageNode site={site} />
}
