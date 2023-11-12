import { GetSiteResponse } from 'lemmy-js-client'
import { Card, CardBody, Image } from '@nextui-org/react'

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
          <Image
            src={site.site_view.site.icon}
            width="40"
            height="40"
            alt="logo"
          />
          <div className="p-2">
            <p className="text-lg text-default-500">
              {site.site_view.site.name}
            </p>
            <p className="text-xs text-default-400 whitespace-nowrap">
              {site.site_view.site.description}
            </p>
          </div>
        </div>
      </CardBody>
      <Image
        removeWrapper
        src={site.site_view.site.banner}
        className="object-cover max-h-[100px] min-h-[100px] max-w-full min-w-full z-0 absolute"
      />
      <div className="bg-white dark:bg-black w-full h-[100px] z-11 opacity-90"></div>
    </Card>
  )
}
