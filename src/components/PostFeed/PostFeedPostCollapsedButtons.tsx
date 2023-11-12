import {
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import MessageIcon from '@/icons/MessageIcon'
import { PostView } from 'lemmy-js-client'
import ShuffleIcon from '@/icons/ShuffleIcon'
import { PostFeedPostCommunity } from './PostFeedPostCommunity'
import PlusIcon from '@/icons/PlusIcon'

export function PostFeedPostCollapsedButtons({
  post,
  duplicates,
  toggleCollapsed,
  setPreview,
}: {
  post: PostView
  duplicates: PostView[]
  toggleCollapsed: () => void
  setPreview: (Function: PostView) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Link
        className="gap-1 hover:cursor-pointer text-default-200 hover:cursor-pointer"
        onClick={() => setPreview(post)}
      >
        <MessageIcon width={12} />
        <p className="text-xs">{post.counts.comments}</p>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Link className="gap-1 hover:cursor-pointer text-default-200">
            <ShuffleIcon width={12} />
            <p className="text-xs">{duplicates ? duplicates.length : 0}</p>
          </Link>
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
      <Link
        className="gap-1 hover:cursor-pointer text-default-200"
        onClick={() => toggleCollapsed()}
      >
        <PlusIcon width={12} />
      </Link>
    </div>
  )
}
