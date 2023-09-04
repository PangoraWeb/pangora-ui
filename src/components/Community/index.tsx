import { getCommunity } from '@/shared/libs/Lemmy/community'
import CommunityNode from './CommunityNode'
import { getPosts } from '@/shared/libs/Lemmy/post'

export default async function Community({ slug }: { slug: string }) {
  const [community, posts] = await Promise.all([
    getCommunity({ name: slug }),
    getPosts({ community_name: slug, limit: 50 }),
  ])

  return <CommunityNode community={community} posts={posts}></CommunityNode>
}
