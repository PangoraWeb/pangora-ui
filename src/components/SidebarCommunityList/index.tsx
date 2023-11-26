'use server'

import { getCommunities } from '@/shared/libs/Lemmy/community'
import { Card, CardBody } from '@nextui-org/card'
import SidebarCommunityListNode from './SidebarCommunityListNode'

export default async function SidebarCommunityList({
  type,
  limit = 5,
  expandLimit = 10,
  title,
}: {
  type: 'TopDay' | 'New'
  limit?: number
  expandLimit?: number
  title?: string
}) {
  const communities = await getCommunities({
    type_: 'Local',
    sort: type,
    limit: expandLimit,
  })

  return (
    <Card className="bg-opacity-50">
      <CardBody className="gap-2 text-center">
        {title && <p>{title}</p>}
        <SidebarCommunityListNode
          type={type}
          communities={communities}
          limit={limit}
          expandLimit={expandLimit}
        />
      </CardBody>
    </Card>
  )
}
