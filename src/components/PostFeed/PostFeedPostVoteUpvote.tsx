import { Link } from '@nextui-org/react'
import { toastError } from '@/shared/libs/Toast'
import ArrowUpIcon from '@/icons/ArrowUpIcon'

export function PostFeedPostVoteUpvote() {
  return (
    <Link
      className="text-default-400 hover:text-green-400 hover:cursor-pointer"
      onPress={() => {
        toastError(
          'Not logged in',
          'You must be logged in to an account to upvote posts'
        )
      }}
    >
      <ArrowUpIcon width={16} />
    </Link>
  )
}
