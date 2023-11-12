import { PostView } from 'lemmy-js-client'
import { PostFeedPostAuthor } from './PostFeedPostAuthor'
import { PostFeedPostCommunity } from './PostFeedPostCommunity'

export function PostFeedPostDescription({ post }: { post: PostView }) {
  return (
    <div className="flex flex-row gap-1 text-xs items-stretch">
      <PostFeedPostAuthor author={post.creator} />
      <p className="cursor-default">to</p>
      <PostFeedPostCommunity post={post} />
    </div>
  )
}
