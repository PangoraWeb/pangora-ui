'use client'

import { Card } from '@nextui-org/react'
import { GetCommunityResponse, PostView, SortType } from 'lemmy-js-client'
import { PostFeed } from '../PostFeed'
import {
  getCommunityBanner,
  getCommunityIcon,
  getCommunityName,
  getCommunityTag,
  getDefaultCommunityIcon,
} from '@/shared/libs/Lemmy/community'
import Image from 'next/image'
import HomeFeedSortButtons from '../HomeFeed/HomeFeedSortButtons'

export default function CommunityNode({
  communities,
  posts,
  sortType,
}: {
  communities: GetCommunityResponse[]
  posts: PostView[]
  sortType: SortType
}) {
  return (
    <div className="flex mt-4">
      <div className="w-full">
        <Card className="bg-opacity-0">
          <div className="w-full h-[200px] overflow-hidden absolute">
            {communities.length === 1 && (
              <Image
                src={getCommunityBanner(communities[0].community_view)}
                width={600}
                height={600}
                className="w-[100%] min-w-[100%] max-w-[100%] z-0 relative"
                alt="test"
              />
            )}
          </div>
          <div className="mt-[136px] ml-[32px]">
            <Image
              src={
                communities.length > 1
                  ? getDefaultCommunityIcon()
                  : getCommunityIcon(communities[0].community_view)
              }
              className="rounded-full w-[128px] h-[128px] z-10 relative"
              alt="test"
              width={128}
              height={128}
            />
          </div>
          <div className="p-5">
            <div className="mb-6">
              <p className="text-2xl">
                {communities.length > 1
                  ? 'Multiple Communities'
                  : getCommunityName(communities[0].community_view)}
              </p>
              <p className="text-md">
                {communities
                  .map((community) => getCommunityTag(community.community_view))
                  .join(', ')}
              </p>
            </div>
            <div className="flex justify-between">
              <HomeFeedSortButtons sortType={sortType} />
            </div>
            <PostFeed posts={posts} />
          </div>
        </Card>
      </div>
    </div>
  )
}

/*
<div className="flex mt-4">
        <div className="w-full md:w-2/3">
          <Card isBlurred>
            <div className="w-full h-[200px] overflow-hidden absolute">
              <Image
                src={community?.community_view.community.banner}
                width={600}
                height={600}
                className="w-[100%] min-w-[100%] max-w-[100%]"
                classNames={{ wrapper: 'w-[100%] min-w-[100%] max-w-[100%]' }}
              />
            </div>
            <div className="mt-[136px] ml-[32px]">
              <Avatar
                src={community?.community_view.community.icon}
                className="rounded-full w-[128px] h-[128px]"
                size="lg"
              />
            </div>
            <div className="p-5">
              <div className="mb-6">
                <p className="text-2xl">
                  {community?.community_view.community.title}
                </p>
                <p className="text-md">
                  !{community?.community_view.community.name}
                </p>
              </div>
              <PostsFeed posts={posts} />
            </div>
          </Card>
        </div>
      </div>
*/

/*'use client'

import { Avatar, Button, ButtonGroup, Card, Image } from '@nextui-org/react'
import {
  GetPostResponse,
  GetCommentsResponse,
  PostView,
  GetCommunityResponse,
} from 'lemmy-js-client'
import { useEffect, useState } from 'react'

interface CommunityParameters {
  params: {
    slug: string
  }
}

export default function Community({ params }: CommunityParameters) {
  const [posts, setPosts] = useState<PostView[]>()
  const [community, setCommunity] = useState<GetCommunityResponse>()

  useEffect(() => {
    fetch()

    async function fetch() {
      setCommunity(await getCommunity({ name: params.slug }))

      const fetchedPosts = [
        ...(await getPosts({ community_name: params.slug, limit: 50 })).posts,
        ...(await getPosts({ community_id: 113, limit: 50 })).posts,
        ...(await getPosts({ community_id: 242, limit: 50 })).posts,
        // TODO: Figure out how to do pages
      ]
      const sortedPosts = fetchedPosts
        .sort((a, b) => {
          return a.counts.published < b.counts.published ? 1 : 0
        })
        .slice(0, 50)
      setPosts(sortedPosts)
    }
  }, [])

  return (
    
      <div className="flex mt-4">
        <div className="w-full md:w-2/3">
          <Card isBlurred>
            <div className="w-full h-[200px] overflow-hidden absolute">
              <Image
                src={community?.community_view.community.banner}
                width={600}
                height={600}
                className="w-[100%] min-w-[100%] max-w-[100%]"
                classNames={{ wrapper: 'w-[100%] min-w-[100%] max-w-[100%]' }}
              />
            </div>
            <div className="mt-[136px] ml-[32px]">
              <Avatar
                src={community?.community_view.community.icon}
                className="rounded-full w-[128px] h-[128px]"
                size="lg"
              />
            </div>
            <div className="p-5">
              <div className="mb-6">
                <p className="text-2xl">
                  {community?.community_view.community.title}
                </p>
                <p className="text-md">
                  !{community?.community_view.community.name}
                </p>
              </div>
              <PostsFeed posts={posts} />
            </div>
          </Card>
        </div>
      </div>
  )
}

function CommentSort() {
  return (
    <ButtonGroup className="m-1">
      <Button variant="bordered" className="data-hover-bg-red-500">
        Hot
      </Button>
      <Button variant="bordered">Top</Button>
      <Button variant="bordered">New</Button>
      <Button variant="bordered">Old</Button>
    </ButtonGroup>
  )
}
*/
