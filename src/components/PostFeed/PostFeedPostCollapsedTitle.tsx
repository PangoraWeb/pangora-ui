import { PostView } from 'lemmy-js-client'
import {
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import {
  getPostId,
  getPostSource,
  getPostTitle,
  getPostURL,
} from '@/shared/libs/Lemmy/post'
import PinIcon from '@/icons/PinIcon'
import { useEffect } from 'react'

export function PostFeedPostCollapsedTitle({
  post,
  setPreview,
}: {
  post: PostView
  setPreview: (post: PostView) => void
}) {
  useEffect(() => {
    const element = document.getElementById(
      `post-title-collapsed-${getPostId(post)}`
    )
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault()
        setPreview(post)
      })
    }
  }, [])

  return (
    <div className="flex gap-1 items-center">
      <Link
        id={`post-title-collapsed-${getPostId(post)}`}
        onClick={() => setPreview(post)}
        className={`text-transparent bg-clip-text bg-gradient-to-r text-xs hover:cursor-pointer ${
          post.post.featured_community
            ? 'from-green-600 to-teal-700'
            : 'from-default-400 to-default-300'
        }`}
      >
        {getPostTitle(post)}
      </Link>
      {getPostURL(post) && (
        <Link href={getPostURL(post)} className="text-[0.6em] text-blue-900">
          <p>({getPostSource(post)})</p>
        </Link>
      )}
      {post.post.featured_community && (
        <Popover>
          <PopoverTrigger>
            <div className="text-teal-700 hover:cursor-pointer">
              <PinIcon width={18} />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <p>This post has been pinned to the top of the community</p>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
