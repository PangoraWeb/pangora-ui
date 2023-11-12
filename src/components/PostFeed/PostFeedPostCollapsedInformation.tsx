import { PostView } from 'lemmy-js-client'
import { PostFeedPostCollapsedTitle } from './PostFeedPostCollapsedTitle'
import { PostFeedPostCollapsedDescription } from './PostFeedPostCollapsedDescription'

export function PostFeedPostCollapsedInformation({
  post,
  setPreview,
}: {
  post: PostView
  setPreview: (post: PostView) => void
}) {
  return (
    <div className="flex flex-col justify-center">
      <PostFeedPostCollapsedTitle post={post} setPreview={setPreview} />
      <PostFeedPostCollapsedDescription post={post} />
    </div>
  )
}
