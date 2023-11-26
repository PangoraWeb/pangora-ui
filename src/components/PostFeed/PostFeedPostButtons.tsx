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
import MinusIcon from '@/icons/MinusIcon'
import { useEffect } from 'react'
import { getPostId } from '@/shared/libs/Lemmy/post'

export function PostFeedPostButtons({
  post,
  duplicates,
  toggleCollapsed,
  setPreview,
}: {
  post: PostView
  duplicates: PostView[]
  toggleCollapsed: () => void
  setPreview: (post: PostView) => void
}) {
  useEffect(() => {
    const element = document.getElementById(
      `post-comments-button-${getPostId(post)}`
    )
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault()
        setPreview(post)
      })
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Link
        className="gap-1 hover:cursor-pointer text-default-400"
        onClick={() => toggleCollapsed()}
      >
        <MinusIcon width={12} />
      </Link>
      <Link
        id={`post-comments-button-${getPostId(post)}`}
        className="gap-1 hover:cursor-pointer text-default-400 hover:cursor-pointer"
        onClick={() => setPreview(post)}
      >
        <MessageIcon width={12} />
        <p className="text-xs">{post.counts.comments}</p>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Link className="gap-1 hover:cursor-pointer text-default-400">
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
    </div>
  )
}
