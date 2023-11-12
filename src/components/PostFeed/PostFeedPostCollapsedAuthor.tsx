import { Person } from 'lemmy-js-client'
import { Avatar, Link } from '@nextui-org/react'
import {
  getPersonAvatar,
  getPersonName,
  getRelativePersonLink,
} from '@/shared/libs/Lemmy/person'

export function PostFeedPostCollapsedAuthor({ author }: { author: Person }) {
  return (
    <Link
      href={getRelativePersonLink(author)}
      className="gap-1 flex items-center text-[1em]"
    >
      <Avatar
        src={getPersonAvatar(author)}
        alt="alt"
        className="rounded-full max-h-[8px] max-w-[8px] bg-transparent"
      />
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-700">
        {getPersonName(author)}
      </p>
    </Link>
  )
}
