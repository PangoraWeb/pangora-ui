import { GetCommunityResponse } from 'lemmy-js-client'
import { Card, CardBody, Image } from '@nextui-org/react'
import {
  getCommunityDescription,
  getCommunityIcon,
  getCommunityName,
} from '@/shared/libs/Lemmy/community'

export function SidebarCommunityBanner({
  community,
  onClick,
}: {
  community: GetCommunityResponse
  onClick: () => void
}) {
  return (
    <Card isPressable onClick={() => onClick()}>
      <CardBody className="absolute z-10">
        <div className="flex justify-center items-center">
          <Image
            src={getCommunityIcon(community.community_view)}
            width="40"
            height="40"
            alt="logo"
          />
          <div className="p-2">
            <p className="text-lg text-default-500">
              {getCommunityName(community.community_view)}
            </p>
            <p className="text-xs text-default-400 whitespace-nowrap">
              {getCommunityDescription(community.community_view, 50)}
            </p>
          </div>
        </div>
      </CardBody>
      <Image
        removeWrapper
        src={community.community_view.community.banner}
        className="object-cover max-h-[100px] min-h-[100px] max-w-full min-w-full z-0 absolute"
      />
      <div className="bg-white dark:bg-black w-full h-[100px] z-11 opacity-90"></div>
    </Card>
  )
}
