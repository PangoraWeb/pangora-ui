'use client'

import { Button } from '@nextui-org/react'
import {
  CommentView,
  Comment as BaseComment,
  MyUserInfo,
  PostView,
} from 'lemmy-js-client'
import { useEffect, useState } from 'react'
import Comment from './Comment'
import { getAuth } from '@/shared/libs/Users'
import { getSite } from '@/shared/libs/Lemmy/site'

interface CommentsViewArgs {
  comments?: CommentView[]
  post?: PostView
}

export function CommentsView({ comments, post }: CommentsViewArgs) {
  const [commentTree, setCommentTree] = useState<CommentMapElement[]>()
  const [user, setUser] = useState<MyUserInfo>()

  useEffect(() => {
    fetch()

    async function fetch() {
      const auth = await getAuth()

      if (auth) {
        const site = await getSite()

        if (site.my_user) setUser(site.my_user)
      }
    }
  }, [])

  useEffect(() => {
    if (comments) setCommentTree(buildCommentsTree(comments, false))
  }, [comments])

  return (
    <div className="m-1">
      {commentTree?.map((comment) => (
        <Comment
          key={comment.comment.comment.id}
          comment={comment.comment}
          depth={comment.depth}
          className="my-3"
          user={user}
        >
          {comment.children}
        </Comment>
      ))}
      {(post?.counts.comments || 0) > (commentTree?.length || 0) && (
        <Button className="bg-default-50 mb-2 border-1 border-default-100 w-[200px] text-default-500">
          {(post?.counts.comments || 0) - (commentTree?.length || 0)}
          {commentTree?.length == 0 ? '' : ' more'}
          {(post?.counts.comments || 0) - (commentTree?.length || 0) > 1
            ? ' replies'
            : ' reply'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-5 -5 24 24"
            width="24"
            fill="currentColor"
          >
            <path d="M10.586 5.657l-3.95-3.95A1 1 0 0 1 8.05.293l5.657 5.657a.997.997 0 0 1 0 1.414L8.05 13.021a1 1 0 1 1-1.414-1.414l3.95-3.95H1a1 1 0 1 1 0-2h9.586z"></path>
          </svg>
        </Button>
      )}
    </div>
  )
}

/*
<Card className="w-full p-4 m-4" isBlurred>
      <CardHeader className="flex gap-5 items-center">Comments</CardHeader>
      <CardBody>
        {comments?.comments.map((comment) => (
          <CommentView className="my-1" comment={comment} />
        ))}
      </CardBody>
    </Card>
*/

function getDepthFromComment(comment: BaseComment) {
  return comment.path.split('.').length
}

function getCommentParentId(comment?: BaseComment) {
  const split = comment?.path.split('.')
  split?.shift()
  return split && split.length > 1
    ? Number(split.at(split.length - 2))
    : undefined
}

export interface CommentMapElement {
  comment: CommentView
  children: CommentMapElement[]
  depth: number
}

function buildCommentsTree(comments: CommentView[], parentComment: boolean) {
  const map = new Map<number, CommentMapElement>()
  const tree: CommentMapElement[] = []

  const depthOffset = !parentComment
    ? 0
    : getDepthFromComment(comments[0].comment) ?? 0

  for (const comment of comments) {
    const depth = getDepthFromComment(comment.comment) - depthOffset
    map.set(comment.comment.id, {
      comment: comment,
      children: [],
      depth: depth,
    })
  }

  if (parentComment) {
    const cNode = map.get(comments[0].comment.id)
    if (cNode) {
      tree.push(cNode)
    }
  }

  for (const comment_view of comments) {
    const child = map.get(comment_view.comment.id)
    if (child) {
      const parent_id = getCommentParentId(comment_view.comment)
      if (parent_id) {
        const parent = map.get(parent_id)
        // Necessary because blocked comment might not exist
        if (parent) {
          parent.children.push(child)
        }
      } else {
        if (!parentComment) {
          tree.push(child)
        }
      }
    }
  }

  return tree
}

/*
<h5 className="text-xs tracking-tight text-default-400">
                {comment && getPersonTag(comment.creator)}
              </h5>


              <div className="flex flex-col gap-1 items-start justify-center ">
                <h4 className="text-xs">
                  {comment?.creator.display_name ?? comment?.creator.name}
                </h4>
              </div>
              {comment?.creator.bot_account && (
                <div className="ml-1 px-1 border-default-100 border-1 bg-default-200 rounded text-default-600 text-xs">
                  Bot
                </div>
              )}
*/

/*
interface CommentViewArgs {
  comment?: CommentView
  className?: string
  children?: CommentMapElement[]
  depth?: number
}

function CommentView2({
  comment,
  className,
  children,
  depth,
}: CommentViewArgs) {
  const [collapsed, setCollapsed] = useState(false)
  let initialized = false

  useEffect(() => {
    if (!initialized) {
      initialized = true
      if ((comment?.counts.score || 0) <= 0) {
        setCollapsed(true)
      }
    }
  }, [])

  function toggleVisibility() {
    setCollapsed(!collapsed)
  }

  return (
    <Card
      className={`${className} flex flex-row`}
      classNames={{ base: 'bg-opacity-70' }}
    >
      <div className="flex items-center">
        <Button
          className={`w-[4px] min-w-[4px] h-[100%] min-h-[100%] max-h-[100%] p-0 text-xs text-default-500 ${
            depth && depthColors[depth - 2]
          }`}
          onClick={toggleVisibility}
        ></Button>
      </div>
      {collapsed ? (
        <div>
          <CardHeader className="flex gap-5 items-center pr-3">
            <div className="text-default-400 mr-2 flex flex-col text-center text-sm">
              <p>{comment?.counts.score}</p>
            </div>
            <Badge
              content={
                <Avatar
                  isBordered
                  radius="full"
                  size="sm"
                  src={comment?.community.icon}
                  className="w-1 h-1"
                />
              }
              placement="bottom-right"
            >
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={comment?.creator.avatar}
                className="w-6 h-6"
              />
            </Badge>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-xs font-semibold leading-none text-default-600">
                {comment && getPersonName(comment.creator)}
              </h4>
              <h5 className="text-xs tracking-tight text-default-400">
                {comment && getPersonTag(comment.creator)}
              </h5>
            <div className="flex gap-1 items-start justify-center items-center">
              <div className="flex flex-col gap-1 items-start justify-center ">
                <h4 className="text-xs">
                  {comment?.creator.display_name ?? comment?.creator.name}
                </h4>
              </div>
              {comment?.creator.bot_account && (
                <div className="ml-1 px-1 border-default-100 border-1 bg-default-200 rounded text-default-600 text-xs">
                  Bot
                </div>
              )}
            </div>
            <p className="text-default-400 text-xs">{`${comment?.comment.content.slice(
              0,
              100
            )}${(comment?.comment.content.length || 0) > 100 ? '...' : ''}`}</p>
          </CardHeader>
        </div>
      ) : (
        <div className=" min-w-[100%]">
          <CardHeader className="flex justify-between">
            <div className="flex gap-5 items-center pr-3">
              <div className="text-slate-500 mr-2 flex flex-col text-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-5 -4.5 24 24"
                  width="18"
                  fill="currentColor"
                  className="w-full"
                >
                  <path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"></path>
                </svg>
                <p className="w-full">{comment?.counts.score}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-5 -4.5 24 24"
                  width="18"
                  fill="currentColor"
                  className="w-full"
                >
                  <path d="M8 11.243l3.95-3.95a1 1 0 1 1 1.414 1.414l-5.657 5.657a.997.997 0 0 1-1.414 0L.636 8.707A1 1 0 1 1 2.05 7.293L6 11.243V1.657a1 1 0 1 1 2 0v9.586z"></path>
                </svg>
              </div>
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
            <div className="flex text-default-400">
              <div className="flex gap-2">
                <CommentActionButton
                  selected={false}
                  color="group-hover:text-rose-500"
                  name="Minimize"
                >
                  <MinusIcon />
                </CommentActionButton>
                <CommentActionButton
                  selected={false}
                  color="group-hover:text-yellow-500"
                  name="Reply"
                >
                  <ArrowBackUpIcon />
                </CommentActionButton>
                <CommentActionButton
                  selected={false}
                  color="group-hover:text-green-500"
                  name="Copy Link"
                >
                  <LinkIcon />
                </CommentActionButton>
                <Dropdown>
                  <DropdownTrigger>
                    <CommentActionButton
                      selected={false}
                      color="group-hover:text-default-600"
                      name="More Actions"
                    >
                      <MoreIcon />
                    </CommentActionButton>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownSection>
                      <DropdownItem>Message</DropdownItem>
                      <DropdownItem>Report</DropdownItem>
                      <DropdownItem>Block User</DropdownItem>
                      <DropdownItem>Save</DropdownItem>
                      <DropdownItem>View Source</DropdownItem>
                    </DropdownSection>
                    <DropdownSection>
                      <DropdownItem>Remove</DropdownItem>
                      <DropdownItem>Ban from Community</DropdownItem>
                      <DropdownItem>Appoint as Mod</DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex px-2">
                <PointIcon width={12} />
              </div>
              <p className="text-xs p-2">
                {comment && getCommentTime(comment)}
              </p>
            </div>
          </CardHeader>
          <CardBody className="py-1 pr-3">
            <div
              className="prose prose-invert max-w-none prose-sm"
              dangerouslySetInnerHTML={mdToHtml(
                cleanText(comment?.comment.content || '')
              )}
            />
            <Spacer y={2} />
            {children && children.map((child) => contructComment(child))}
            {(comment?.counts.child_count || 0) > (children?.length || 0) && (
              <Button className="bg-default-50 mb-2 border-1 border-default-100 w-[200px] text-default-500">
                {(comment?.counts.child_count || 0) - (children?.length || 0)}
                {children?.length == 0 ? '' : ' more'}
                {(comment?.counts.child_count || 0) - (children?.length || 0) >
                1
                  ? ' replies'
                  : ' reply'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-5 -5 24 24"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M10.586 5.657l-3.95-3.95A1 1 0 0 1 8.05.293l5.657 5.657a.997.997 0 0 1 0 1.414L8.05 13.021a1 1 0 1 1-1.414-1.414l3.95-3.95H1a1 1 0 1 1 0-2h9.586z"></path>
                </svg>
              </Button>
            )}
          </CardBody>
        </div>
      )}
    </Card>
  )
}
*/
