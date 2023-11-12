import { Avatar, Badge } from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'

export default function PostAuthor({ post }: { post: PostView }) {
  return (
    <div className="flex gap-5 items-center">
      <Badge
        content={
          <Avatar
            isBordered
            radius="full"
            size="sm"
            src={post.creator.avatar}
            className="w-3 h-3"
          />
        }
        placement="bottom-right"
      >
        <Avatar isBordered radius="full" size="md" src={post.community.icon} />
      </Badge>
      <div className="flex flex-col gap-1 items-start justify-center">
        <h4 className="text-small font-semibold leading-none text-default-600">
          {post.community.title ?? post.community.name}
        </h4>
        <h5 className="text-small tracking-tight text-default-400">
          {post.creator.display_name ?? post.creator.name}
        </h5>
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
