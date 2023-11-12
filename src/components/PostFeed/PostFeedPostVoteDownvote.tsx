import { Link } from '@nextui-org/react'
import { toastError } from '@/shared/libs/Toast'
import ArrowDownIcon from '@/icons/ArrowDownIcon'

export function PostFeedPostVoteDownvote() {
  return (
    <Link
      className="text-default-400 hover:text-red-400 hover:cursor-pointer"
      onPress={() => {
        toastError(
          'Not logged in',
          'You must be logged in to an account to downvote posts'
        )
      }}
    >
      <ArrowDownIcon width={16} />
    </Link>
  )
}
