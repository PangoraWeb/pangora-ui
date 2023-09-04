import { getCommunity } from '@/shared/libs/Lemmy/community'
import CommunityNode from './CommunityNode'
import { getPosts } from '@/shared/libs/Lemmy/post'

export default async function Community({ slug }: { slug: string }) {
  const fixedSlug = decodeURIComponent(slug)

  const [community, posts] = await Promise.all([
    getCommunity({ name: fixedSlug }),
    getPosts({ community_name: fixedSlug, limit: 50 }),
  ])

  return <CommunityNode community={community} posts={posts}></CommunityNode>
}
