import {
  getCommunityIcon,
  getCommunityName,
  getRelativeCommunityLink,
} from '@/shared/libs/Lemmy/community'
import {
  getPersonAvatar,
  getPersonName,
  getRelativePersonLink,
} from '@/shared/libs/Lemmy/person'
import { Avatar, Badge, Link } from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'

export default function PostAuthor({ post }: { post: PostView }) {
  return (
    <div className="flex gap-5 items-center">
      <Badge
        content={
          <Link href={getRelativePersonLink(post.creator)}>
            <Avatar
              isBordered
              radius="full"
              size="sm"
              src={getPersonAvatar(post.creator)}
              className="w-3 h-3"
            />
          </Link>
        }
        placement="bottom-right"
      >
        <Link href={getRelativeCommunityLink(post.community)}>
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={getCommunityIcon(post.community)}
          />
        </Link>
      </Badge>
      <div className="flex flex-col gap-1 items-start justify-center">
        <Link href={getRelativeCommunityLink(post.community)}>
          <h4 className="text-small font-semibold leading-none text-default-600">
            {getCommunityName(post.community)}
          </h4>
        </Link>
        <Link href={getRelativePersonLink(post.creator)}>
          <h5 className="text-small tracking-tight text-default-400">
            {getPersonName(post.creator)}
          </h5>
        </Link>
        {post.creator.bot_account && (
          <div className="text-xs ml-1 px-1 mb-1 border-default-100 border-1 bg-default-200 rounded text-default-600">
            Bot
          </div>
        )}
      </div>
    </div>
  )
}

/*
<Popover showArrow placement="bottom" backdrop="opaque">
      <PopoverTrigger>
        <User
          as="button"
          name={getPersonName(post.creator)}
          description={getPersonTag(post.creator)}
          avatarProps={{ src: getPersonAvatar(post.creator) }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        {getPersonLink(post.creator)}
      </PopoverContent>
    </Popover>
*/
