import { CardBody, CardHeader, Spacer } from '@nextui-org/react'
import { CommentView, MyUserInfo } from 'lemmy-js-client'
import Comment from './Comment'
import { mdToHtml } from '@/shared/libs/Markdown'
import { getCommentContent } from '@/shared/libs/Lemmy/comment'
import { CommentMapElement } from '.'
import { CommentAuthor } from './CommentAuthor'
import { CommentButtons } from './CommentButtons'
import { CommentScore } from './CommentScore'

export function CommentBody({
  comment,
  children,
  user,
  toggleCollapsed,
}: {
  comment: CommentView
  children: CommentMapElement[]
  user?: MyUserInfo
  toggleCollapsed: () => void
}) {
  return (
    <div className="w-full">
      <CardHeader className="flex justify-between w-full">
        <div className="flex gap-5 items-center pr-3">
          <CommentScore comment={comment} />
          <CommentAuthor comment={comment} />
        </div>
        <CommentButtons comment={comment} toggleCollapsed={toggleCollapsed} />
      </CardHeader>
      <CardBody className="py-1 pr-3 pl-2">
        {/* Comment Content */}
        <div
          className="prose prose-invert max-w-none prose-sm ml-2 prose-code:text-xs"
          dangerouslySetInnerHTML={mdToHtml(getCommentContent(comment))}
        />

        <Spacer y={2} />

        {/* Child Comments */}
        {children &&
          children.map((child) => (
            <Comment
              key={child.comment.comment.id}
              comment={child.comment}
              depth={child.depth}
              className="my-3"
              user={user}
            >
              {child.children}
            </Comment>
          ))}
      </CardBody>
    </div>
  )
}
