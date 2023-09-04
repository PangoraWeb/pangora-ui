import { getSite } from '@/shared/libs/Lemmy/site'
import NavbarNode from './NavbarNode'

export default async function Navbar() {
  const site = await getSite()

  return <NavbarNode site={site} />
}
