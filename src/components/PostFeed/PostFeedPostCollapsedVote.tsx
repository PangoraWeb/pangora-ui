import { PostView } from 'lemmy-js-client'
import { compactNumber } from '@/shared/libs/Number'

export function PostFeedPostCollapsedVote({ post }: { post: PostView }) {
  return (
    <div className="text-default-400 text-center flex flex-col items-center justify-center text-sm">
      <p className="hover:cursor-default">{compactNumber(post.counts.score)}</p>
    </div>
  )
}
