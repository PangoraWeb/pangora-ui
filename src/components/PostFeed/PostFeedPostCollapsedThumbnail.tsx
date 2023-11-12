import { PostView } from 'lemmy-js-client'
import { Image, Link } from '@nextui-org/react'
import MessageIcon from '@/icons/MessageIcon'
import { getPostURL, getRelativePostLink } from '@/shared/libs/Lemmy/post'
import LinkIcon from '@/icons/LinkIcon'

export function PostFeedPostCollapsedThumbnail({ post }: { post: PostView }) {
  return (
    <Link
      href={getPostURL(post) || getRelativePostLink(post)}
      className="text-default-500"
    >
      {post.post.thumbnail_url ? (
        <Image
          src={post.post.thumbnail_url}
          alt="alt"
          width="30"
          height="30"
          className="rounded-lg max-h-[30px] min-h-[30px] max-w-[30px] min-w-[30px] object-cover"
        />
      ) : (
        <div className="h-[30px] w-[30px] max-w-[30px] min-w-[30px] flex items-center justify-center bg-default-50 bg-opacity-30 rounded">
          {getPostURL(post) ? (
            <LinkIcon width={10} />
          ) : (
            <MessageIcon width={10} />
          )}
        </div>
      )}
    </Link>
  )
}
