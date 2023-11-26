'use client'

import { GetCommunityResponse } from 'lemmy-js-client'
import { getCommunity, getCommunityId } from '@/shared/libs/Lemmy/community'
import { useEffect, useState } from 'react'
import { SidebarCommunityBanner } from './SidebarCommunityBanner'
import { SidebarCommunityButtons } from './SidebarCommunityButtons'

export default function SidebarCommunity({
  slug,
  startButtonsShown = false,
}: {
  slug: string
  startButtonsShown?: boolean
}) {
  const [communities, setCommunities] = useState<GetCommunityResponse[]>([])
  const [showButtons, setShowButtons] = useState(startButtonsShown)

  function toggleButtons() {
    setShowButtons(!showButtons)
  }

  useEffect(() => {
    fetch()

    async function fetch() {
      const fixedSlug = decodeURIComponent(slug)
      const splitSlugs = fixedSlug.split('+')

      const communities = await Promise.all(
        splitSlugs.map((slug) => getCommunity({ name: slug }))
      )

      setCommunities(communities)
    }
  }, [])

  return (
    <div>
      {communities.map((community) => (
        <div
          className="flex flex-col gap-1"
          key={getCommunityId(community.community_view)}
        >
          <SidebarCommunityBanner
            community={community}
            onClick={() => toggleButtons()}
          />
          {showButtons && community && <SidebarCommunityButtons />}
        </div>
      ))}
    </div>
  )
}

/*
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
          <Button
            onClick={() => {
              hideCommunity(community.community_view)
            }}
          >
            Hide Community
          </Button>
        </CardBody>
      </Card>
      <ModeratorGroup moderators={community?.moderators || []} />
    </div>
*/
