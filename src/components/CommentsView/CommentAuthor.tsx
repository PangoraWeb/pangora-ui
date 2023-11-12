import { Avatar, Badge } from '@nextui-org/react'
import { CommentView } from 'lemmy-js-client'
import { getPersonTag } from '@/shared/libs/Lemmy/person'

export function CommentAuthor({ comment }: { comment: CommentView }) {
  return (
    <div className="flex gap-3">
      <Badge
        content={
          <Avatar
            isBordered
            radius="full"
            size="sm"
            src={comment?.community.icon}
            className="w-2 h-2"
          />
        }
        color="success"
        placement="bottom-right"
      >
        <Avatar
          isBordered
          radius="full"
          size="sm"
          src={comment?.creator.avatar}
        />
      </Badge>
      <div className="flex items-start">
        <div className="flex flex-col gap-1 items-start justify-center">
          <div className="flex gap-1 items-start justify-center items-center">
            <h4 className="text-xs font-semibold leading-none text-default-600 justify-center">
              {comment?.creator.display_name ?? comment?.creator.name}
            </h4>
            {comment?.creator.bot_account && (
              <div className="text-xs ml-1 px-1 border-default-100 border-1 bg-default-200 rounded text-default-600">
                Bot
              </div>
            )}
          </div>

          <h5 className="text-xs tracking-tight text-default-400">
            {comment && getPersonTag(comment?.creator)}
          </h5>
        </div>
      </div>
    </div>
  )
}
