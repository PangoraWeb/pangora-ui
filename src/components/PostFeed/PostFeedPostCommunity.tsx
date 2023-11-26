import { PostView } from 'lemmy-js-client'
import {
  getCommunityIcon,
  getCommunityName,
  getCommunityPrimaryColor,
  getCommunitySecondaryColor,
  getRelativeCommunityLink,
} from '@/shared/libs/Lemmy/community'
import { getRelativePostLink } from '@/shared/libs/Lemmy/post'
import Image from 'next/image'
import Link from 'next/link'

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
      className="gap-1 flex items-center text-xs hover:opacity-80 transition-opacity"
    >
      <Image
        src={getCommunityIcon(post.community)}
        alt="alt"
        className="rounded-full max-h-[14px] max-w-[14px] bg-transparent"
        width="14"
        height="14"
      />
      <p
        className={`text-transparent bg-clip-text`}
        style={{
          backgroundImage: `linear-gradient(90deg, ${getCommunityPrimaryColor(
            post.community
          )}, ${getCommunitySecondaryColor(post.community)})`,
        }}
      >
        {getCommunityName(post.community)}
      </p>
    </Link>
  )
}
