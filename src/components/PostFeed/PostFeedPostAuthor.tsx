import { Person } from 'lemmy-js-client'
import { Avatar, Link } from '@nextui-org/react'
import {
  getPersonAvatar,
  getPersonName,
  getRelativePersonLink,
} from '@/shared/libs/Lemmy/person'

export function PostFeedPostAuthor({ author }: { author: Person }) {
  return (
    <Link
      href={getRelativePersonLink(author)}
      className="gap-1 flex items-center text-xs"
    >
      <Avatar
        src={getPersonAvatar(author)}
        alt="alt"
        className="rounded-full max-h-[14px] max-w-[14px] bg-transparent"
      />
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
        {getPersonName(author)}
      </p>
      {author.bot_account && (
        <div className="text-xs ml-1 px-1 mb-1 border-default-100 border-1 bg-default-200 rounded text-default-600">
          Bot
        </div>
      )}
    </Link>
  )
}
