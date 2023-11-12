import { PostView } from 'lemmy-js-client'
import { Avatar, Link } from '@nextui-org/react'
import {
  getCommunityIcon,
  getCommunityName,
  getRelativeCommunityLink,
} from '@/shared/libs/Lemmy/community'
import { getRelativePostLink } from '@/shared/libs/Lemmy/post'

export function PostFeedPostCollapsedCommunity({
  post,
  shouldLinkToPost = false,
}: {
  post: PostView
  shouldLinkToPost?: boolean
}) {
  return (
    <Link
      href={
        shouldLinkToPost
          ? getRelativePostLink(post)
          : getRelativeCommunityLink(post.community)
      }
      className="gap-1 flex items-center text-[1em]"
    >
      <Avatar
        src={getCommunityIcon(post.community)}
        alt="alt"
        className="rounded-full max-h-[8px] max-w-[8px] bg-transparent"
      />
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">
        {getCommunityName(post.community)}
      </p>
    </Link>
  )
}
