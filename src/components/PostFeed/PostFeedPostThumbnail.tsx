import { PostView } from 'lemmy-js-client'
import { Image, Link } from '@nextui-org/react'
import MessageIcon from '@/icons/MessageIcon'
import { getPostURL, getRelativePostLink } from '@/shared/libs/Lemmy/post'
import LinkIcon from '@/icons/LinkIcon'

export function PostFeedPostThumbnail({ post }: { post: PostView }) {
  return (
    <Link
      href={getPostURL(post) || getRelativePostLink(post)}
      className="text-default-500"
    >
      {post.post.thumbnail_url ? (
        <Image
          src={post.post.thumbnail_url}
          alt="alt"
          width="70"
          height="70"
          className="rounded-lg max-h-[70px] min-h-[70px] max-w-[70px] min-w-[70px] object-cover"
        />
      ) : (
        <div className="h-[70px] w-[70px] max-w-[70px] min-w-[70px] flex items-center justify-center bg-default-50 bg-opacity-30 rounded">
          {getPostURL(post) ? <LinkIcon /> : <MessageIcon />}
        </div>
      )}
    </Link>
  )
}
