import { PostView } from 'lemmy-js-client'
import { Avatar, Link } from '@nextui-org/react'
import {
  getCommunityIcon,
  getCommunityName,
  getRelativeCommunityLink,
} from '@/shared/libs/Lemmy/community'
import { getRelativePostLink } from '@/shared/libs/Lemmy/post'

export function PostFeedPostCommunity({
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
      className="gap-1 flex items-center text-xs"
    >
      <Avatar
        src={getCommunityIcon(post.community)}
        alt="alt"
        className="rounded-full max-h-[14px] max-w-[14px] bg-transparent"
      />
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        {getCommunityName(post.community)}
      </p>
    </Link>
  )
}
