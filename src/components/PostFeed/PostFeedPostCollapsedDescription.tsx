import { PostView } from 'lemmy-js-client'
import { PostFeedPostCollapsedAuthor } from './PostFeedPostCollapsedAuthor'
import { PostFeedPostCollapsedCommunity } from './PostFeedPostCollapsedCommunity'

export function PostFeedPostCollapsedDescription({ post }: { post: PostView }) {
  return (
    <div className="flex flex-row gap-1 text-[0.5em] items-stretch">
      <PostFeedPostCollapsedAuthor author={post.creator} />
      <p className="cursor-default">to</p>
      <PostFeedPostCollapsedCommunity post={post} />
    </div>
  )
}
