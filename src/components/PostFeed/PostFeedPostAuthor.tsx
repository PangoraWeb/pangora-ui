import { Person } from 'lemmy-js-client'
import { Link } from '@nextui-org/react'
import {
  getPersonAvatar,
  getPersonName,
  getRelativePersonLink,
} from '@/shared/libs/Lemmy/person'
import Image from 'next/image'

export function PostFeedPostAuthor({ author }: { author: Person }) {
  return (
    <Link
      href={getRelativePersonLink(author)}
      className="gap-1 flex items-center text-xs"
    >
      <Image
        src={getPersonAvatar(author)}
        alt="alt"
        className="rounded-full max-h-[14px] max-w-[14px] bg-transparent"
        width={14}
        height={14}
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
