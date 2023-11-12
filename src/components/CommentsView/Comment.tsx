import { CommentView, MyUserInfo } from 'lemmy-js-client'
import { useEffect, useState } from 'react'
import { CommentMapElement } from '.'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spacer,
} from '@nextui-org/react'
import { mdToHtml } from '@/shared/libs/Markdown'
import { getCommentContent, saveComment } from '@/shared/libs/Lemmy/comment'
import { CommentCollapseBar } from './CommentCollapseBar'
import { getPersonName, getPersonTag } from '@/shared/libs/Lemmy/person'
import CommentActionButton from './CommentActionButton'
import MoreIcon from '@/icons/MoreIcon'
import PlusIcon from '@/icons/PlusIcon'
import LinkIcon from '@/icons/LinkIcon'
import BookmarkIcon from '@/icons/BookmarkIcon'
import DocumentIcon from '@/icons/DocumentIcon'
import StopIcon from '@/icons/StopIcon'
import FlagIcon from '@/icons/FlagIcon'
import { toast } from 'sonner'
import BookmarkRemoveIcon from '@/icons/BookmarkRemoveIcon'

export default function Comment({
  comment,
  depth,
  children,
  className,
  user,
}: {
  comment: CommentView
  className: string
  children: CommentMapElement[]
  depth: number
  user?: MyUserInfo
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (user) {
      console.log(comment)
      console.log(comment.saved)
      setBookmarked(comment.saved)
    }
  }, [user])

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      if (comment.counts.score <= 0) {
        setCollapsed(true)
      }
    }
  }, [])

  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <Card
      className={`${className} flex flex-row`}
      classNames={{ base: 'bg-opacity-70' }}
    >
      <div className="flex items-center w-full">
        {/* Colored bar on the side */}
        <CommentCollapseBar onClick={toggleCollapsed} depth={depth} />

        {/* Main Comment Part */}
        {collapsed ? (
          <div className="w-full">
            <CardHeader className="flex justify-between w-full">
              <div className="flex gap-5 items-center">
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
                  <p className="text-xs font-semibold leading-none text-default-600">
                    {comment && getPersonName(comment.creator)}
                  </p>
                  <p className="text-xs tracking-tight text-default-400">
                    {comment && getPersonTag(comment.creator)}
                  </p>
                </div>
                <p className="text-default-400 text-xs">{`${getCommentContent(
                  comment,
                  100
                )}`}</p>
              </div>
              <div className="flex gap-2">
                <CommentActionButton
                  name="Expand Comment"
                  selected={false}
                  color="group-hover:text-red-500"
                  onClick={toggleCollapsed}
                >
                  <PlusIcon />
                </CommentActionButton>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      className="group hover:transition-all text-default-500 dark:text-default-300 hover:rotate-6 hover:scale-110 scale-100 duration-300 ease-in-out delay-75 hover:-translate-y-[0.25em]"
                    >
                      <div
                        className={`flex items-center h-full transition-all duration-300 delay-75 ease-in-out border-blue-400 border-opacity-0 border-b-2`}
                      >
                        <div
                          className={`group-hover:transition-all duration-300 delay-75 ease-in-out`}
                        >
                          <MoreIcon />
                        </div>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {user ? (
                      <DropdownSection title="Actions">
                        <DropdownItem
                          key="copy"
                          startContent={<LinkIcon />}
                          className="text-default-600 data-[hover=true]:text-green-500"
                          onClick={() => {
                            navigator.clipboard.writeText(comment.comment.ap_id)
                            toast.custom(() => (
                              <Card className="bg-green-950 text-green-400 border-green-400 border-1">
                                <CardBody>
                                  <div className="flex items-center gap-3">
                                    <div className="min-w-[24px]">
                                      <LinkIcon />
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-lg">
                                        Copied Link to Comment
                                      </p>
                                      <p className="text-xs">
                                        {getCommentContent(comment, 100)}
                                      </p>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            ))
                          }}
                        >
                          Copy Link
                        </DropdownItem>
                        <DropdownItem
                          key="bookmark"
                          startContent={
                            bookmarked ? (
                              <BookmarkRemoveIcon />
                            ) : (
                              <BookmarkIcon />
                            )
                          }
                          className="text-default-600 data-[hover=true]:text-violet-500"
                          onClick={async () => {
                            const bookmarkState = bookmarked
                            console.log(bookmarkState)

                            await saveComment({
                              comment_id: comment.comment.id,
                              save: !bookmarkState,
                            })
                            if (bookmarkState) {
                              toast.custom(() => (
                                <Card className="bg-violet-950 text-violet-400 border-violet-400 border-1">
                                  <CardBody>
                                    <div className="flex items-center gap-3">
                                      <div className="min-w-[24px]">
                                        <BookmarkRemoveIcon />
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="text-lg">
                                          Unbookmarked Comment
                                        </p>
                                        <p className="text-xs">
                                          {getCommentContent(comment, 100)}
                                        </p>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              ))
                            } else {
                              toast.custom(() => (
                                <Card className="bg-violet-950 text-violet-400 border-violet-400 border-1">
                                  <CardBody>
                                    <div className="flex items-center gap-3">
                                      <div className="min-w-[24px]">
                                        <BookmarkIcon />
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="text-lg">
                                          Bookmarked Comment
                                        </p>
                                        <p className="text-xs">
                                          {getCommentContent(comment, 100)}
                                        </p>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              ))
                            }
                            setBookmarked(!bookmarkState)
                          }}
                        >
                          Bookmark
                        </DropdownItem>
                        <DropdownItem
                          key="source"
                          startContent={<DocumentIcon />}
                          className="text-default-600 data-[hover=true]:text-amber-500"
                        >
                          View Source
                        </DropdownItem>
                        <DropdownItem
                          key="block"
                          startContent={<StopIcon />}
                          className="text-red-500 data-[hover=true]:text-red-600"
                        >
                          Block User
                        </DropdownItem>
                        <DropdownItem
                          key="report"
                          startContent={<FlagIcon />}
                          className="text-red-500 data-[hover=true]:text-red-600"
                        >
                          Report
                        </DropdownItem>
                      </DropdownSection>
                    ) : (
                      <DropdownSection title="Actions">
                        <DropdownItem
                          key="copy"
                          startContent={<LinkIcon />}
                          className="text-default-600 data-[hover=true]:text-green-500"
                        >
                          Copy Link
                        </DropdownItem>
                      </DropdownSection>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardHeader>
          </div>
        ) : (
          <CardBody className="py-1 pr-3 pl-2">
            {/* Comment Content */}
            <div
              className="prose prose-invert max-w-none prose-sm"
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
        )}
      </div>
    </Card>
  )
}

/*
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
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-xs font-semibold leading-none text-default-600">
                  {comment?.creator.display_name ?? comment?.creator.name}
                </h4>
                <h5 className="text-xs tracking-tight text-default-400">
                  {comment && getPersonTag(comment?.creator)}
                </h5>
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
