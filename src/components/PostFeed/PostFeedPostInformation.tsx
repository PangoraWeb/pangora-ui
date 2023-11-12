import { PostView } from 'lemmy-js-client'
import { PostFeedPostTitle } from './PostFeedPostTitle'
import { PostFeedPostButtons } from './PostFeedPostButtons'
import { PostFeedPostDescription } from './PostFeedPostDescription'
import { PostFeedPostSource } from './PostFeedPostSource'
import { getPostURL } from '@/shared/libs/Lemmy/post'

export function PostFeedPostInformation({
  post,
  duplicates,
  toggleCollapsed,
  setPreview,
}: {
  post: PostView
  duplicates: PostView[]
  toggleCollapsed: () => void
  setPreview: (post: PostView) => void
}) {
  return (
    <div className="flex flex-col justify-center">
      <PostFeedPostTitle post={post} setPreview={setPreview} />
      {getPostURL(post) && (
        <div className="-mt-2">
          <PostFeedPostSource post={post} />
        </div>
      )}
      <PostFeedPostDescription post={post} />
      <div className="mt-1">
        <PostFeedPostButtons
          post={post}
          duplicates={duplicates}
          toggleCollapsed={toggleCollapsed}
          setPreview={setPreview}
        />
      </div>
    </div>
  )
}
