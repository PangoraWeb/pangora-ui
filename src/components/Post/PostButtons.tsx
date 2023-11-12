import DatabaseIcon from '@/icons/DatabaseIcon'
import DocumentFilledIcon from '@/icons/DocumentFilledIcon'
import DocumentIcon from '@/icons/DocumentIcon'
import LinkIcon from '@/icons/LinkIcon'
import MessageIcon from '@/icons/MessageIcon'
import ShuffleIcon from '@/icons/ShuffleIcon'
import { getPostLink, getRelativePostLink } from '@/shared/libs/Lemmy/post'
import { toastLink } from '@/shared/libs/Toast'
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'
import { PostFeedPostCommunity } from '../PostFeed/PostFeedPostCommunity'

export default function PostButtons({
  post,
  bodySourceActive,
  toggleBodySource,
  duplicates,
  toggleComments,
}: {
  post: PostView
  bodySourceActive: boolean
  toggleBodySource: () => void
  duplicates: PostView[]
  toggleComments: () => void
}) {
  return (
    <ButtonGroup variant="solid" size="sm">
      {post.post.body && (
        <Button
          className="text-default-300 bg-white dark:bg-neutral-900"
          onClick={() => toggleBodySource()}
        >
          {bodySourceActive ? (
            <DocumentIcon width={16} />
          ) : (
            <DocumentFilledIcon width={16} />
          )}
        </Button>
      )}
      <Button
        className="text-default-300 bg-white dark:bg-neutral-900"
        onClick={() => {
          navigator.clipboard.writeText(getRelativePostLink(post))
          toastLink('Copied link', 'Copied post link to clipboard')
        }}
      >
        <LinkIcon width={16} />
      </Button>
      <Button
        className="text-default-300 bg-white dark:bg-neutral-900"
        onClick={() => {
          navigator.clipboard.writeText(getPostLink(post))
          toastLink(
            'Copied link',
            "Copied link to post on creator's instance to clipboard"
          )
        }}
      >
        <DatabaseIcon width={16} />
      </Button>
      <Button
        className="text-default-300 bg-white dark:bg-neutral-900"
        onClick={() => toggleComments()}
      >
        <div className="flex gap-1">
          <MessageIcon width={16} />
          <p>{post.counts.comments}</p>
        </div>
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button className="text-default-300 bg-white dark:bg-neutral-900">
            <div className="flex gap-1">
              <ShuffleIcon width={16} />
              <p>{duplicates.length}</p>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Crossposted to:</p>
          {duplicates.length > 0 ? (
            duplicates.map((duplicate) => (
              <PostFeedPostCommunity
                key={duplicate.post.id}
                post={duplicate}
                shouldLinkToPost={true}
              />
            ))
          ) : (
            <p className="text-default-500">Nothing</p>
          )}
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
