import { PostView } from 'lemmy-js-client'
import { Link } from '@nextui-org/react'
import { getPostSource, getPostURL } from '@/shared/libs/Lemmy/post'

export function PostFeedPostSource({ post }: { post: PostView }) {
  return (
    <Link href={getPostURL(post)} className="text-xs text-blue-600">
      <p>{getPostSource(post)}</p>
    </Link>
  )
}
