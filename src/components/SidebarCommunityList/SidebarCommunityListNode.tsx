'use client'

import {
  getCommunityIcon,
  getCommunityId,
  getCommunityName,
  getCommunityPrimaryColor,
  getCommunitySecondaryColor,
  getCommunitySubscribers,
  getCommunityTime,
  getCommunityUsersDay,
  getRelativeCommunityLink,
} from '@/shared/libs/Lemmy/community'
import { Link } from '@nextui-org/link'
import { compactNumber } from '@/shared/libs/Number'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import ArrowDownIcon from '@/icons/ArrowDownIcon'
import { ListCommunitiesResponse } from 'lemmy-js-client'
import { useEffect, useState } from 'react'
import ArrowUpIcon from '@/icons/ArrowUpIcon'

export default function SidebarCommunityListNode({
  type,
  communities,
  limit = 5,
  expandLimit = 10,
}: {
  type: 'TopDay' | 'New'
  communities: ListCommunitiesResponse
  limit?: number
  expandLimit?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  function toggleExpanded() {
    setExpanded(!expanded)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex flex-col gap-2 ">
      {communities.communities
        .map((community) => (
          <Link
            href={getRelativeCommunityLink(community)}
            key={getCommunityId(community)}
          >
            <div
              className="flex gap-2 items-center"
              key={getCommunityId(community)}
            >
              <Image
                src={getCommunityIcon(community) || ''}
                alt="test"
                width={24}
                height={24}
                className="rounded-full"
              />

              <div className="flex-col text-left">
                <p
                  className="max-w-max text-transparent bg-clip-text text-sm"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${getCommunityPrimaryColor(
                      community.community
                    )}, ${getCommunitySecondaryColor(community.community)})`,
                  }}
                >
                  {getCommunityName(community)}
                </p>
                {type === 'TopDay' && (
                  <p className="text-default-500 text-xs">
                    {compactNumber(getCommunityUsersDay(community))} active
                    users today -{' '}
                    {compactNumber(getCommunitySubscribers(community))}{' '}
                    subscribers
                  </p>
                )}
                {type === 'New' && (
                  <p className="text-default-500 text-xs">
                    Created {getCommunityTime(community)} -{' '}
                    {compactNumber(getCommunitySubscribers(community))}{' '}
                    subscribers
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))
        .slice(0, expanded ? expandLimit : limit)}
      {isMounted && (
        <Button
          size="sm"
          className="bg-opacity-50 text-default-800"
          onClick={() => toggleExpanded()}
          suppressHydrationWarning
        >
          {expanded ? <ArrowUpIcon width={16} /> : <ArrowDownIcon width={16} />}
          <p>{expanded ? 'Show less' : 'Show more'}</p>
        </Button>
      )}
    </div>
  )
}
