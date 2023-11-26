import { getCommunity } from '@/shared/libs/Lemmy/community'
import CommunityNode from './CommunityNode'
import { getPosts } from '@/shared/libs/Lemmy/post'

export default async function Community({ slug }: { slug: string }) {
  const fixedSlug = decodeURIComponent(slug)

  const splitSlugs = fixedSlug.split('+')

  const communities = await Promise.all(
    splitSlugs.map((slug) => getCommunity({ name: slug }))
  )
  const posts = await Promise.all(
    splitSlugs.map((slug) =>
      getPosts({
        community_name: slug,
        limit: 50,
      })
    )
  )

  const mergedPosts = posts
    .map((post) => post.posts)
    .flat()
    .sort((a, b) => {
      const asplit = a.counts.published.split('T')
      const bsplit = b.counts.published.split('T')

      if (asplit[0] !== bsplit[0]) {
        return asplit[0] < bsplit[0] ? 1 : -1
      }

      if (asplit[1] !== bsplit[1]) {
        return asplit[1] < bsplit[1] ? 1 : -1
      }

      return 0
    })

  return (
    <CommunityNode
      communities={communities}
      posts={mergedPosts}
    ></CommunityNode>
  )
}
