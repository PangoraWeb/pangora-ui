import { GetSiteResponse } from 'lemmy-js-client'
import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import {
  getSiteBanner,
  getSiteDescription,
  getSiteIcon,
  getSiteName,
} from '@/shared/libs/Lemmy/site'

export function SidebarSiteBanner({
  site,
  onClick,
}: {
  site: GetSiteResponse
  onClick: () => void
}) {
  return (
    <Card isPressable onClick={() => onClick()}>
      <CardBody className="absolute z-10">
        <div className="flex justify-center items-center">
          <Image src={getSiteIcon(site)} width="40" height="40" alt="logo" />
          <div className="p-2">
            <p className="text-lg text-default-500">{getSiteName(site)}</p>
            <p className="text-xs text-default-400 whitespace-nowrap">
              {getSiteDescription(site)}
            </p>
          </div>
        </div>
      </CardBody>
      <Image
        src={getSiteBanner(site)}
        width="100"
        height="100"
        alt="banner"
        className="object-cover max-h-[100px] min-h-[100px] max-w-full min-w-full z-0 absolute"
      />
      <div className="bg-white dark:bg-black w-full h-[100px] z-11 opacity-90"></div>
    </Card>
  )
}
