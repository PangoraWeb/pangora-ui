import { PostView } from 'lemmy-js-client'
import { compactNumber } from '@/shared/libs/Number'
import { PostFeedPostVoteDownvote } from './PostFeedPostVoteDownvote'
import { PostFeedPostVoteUpvote } from './PostFeedPostVoteUpvote'

export function PostFeedPostVote({ post }: { post: PostView }) {
  return (
    <div className="text-default-400 text-center flex flex-col items-center justify-center text-sm">
      <PostFeedPostVoteUpvote />
      <p className="hover:cursor-default">{compactNumber(post.counts.score)}</p>
      <PostFeedPostVoteDownvote />
    </div>
  )
}
