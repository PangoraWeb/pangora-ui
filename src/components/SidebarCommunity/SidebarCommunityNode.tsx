'use client'

import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react'
import { GetCommunityResponse } from 'lemmy-js-client'
import ModeratorGroup from './ModeratorGroup'
import { mdToHtml } from '@/shared/libs/Markdown'

export default function SidebarCommunityNode({
  community,
}: {
  community: GetCommunityResponse
}) {
  return (
    <div>
      <Card className="p-4 my-4 mx-3" isBlurred>
        <CardHeader className="flex justify-center">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={community.community_view.community.icon}
          />
          <div className="p-2">
            <p className="text-lg text-default-600">
              {community.community_view.community.title}
            </p>
            <p className="text-xs text-default-500">
              {community.community_view.community.name}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div
            dangerouslySetInnerHTML={mdToHtml(
              community.community_view.community.description ?? ''
            )}
            className="prose mt-6 prose-invert prose-img:my-1 prose-sm"
          ></div>
        </CardBody>
      </Card>
      <ModeratorGroup moderators={community?.moderators || []} />
    </div>
  )
}
