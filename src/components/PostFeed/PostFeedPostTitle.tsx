import { PostView } from 'lemmy-js-client'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { getPostId, getPostTitle } from '@/shared/libs/Lemmy/post'
import PinIcon from '@/icons/PinIcon'
import { useEffect } from 'react'
import Link from 'next/link'

export function PostFeedPostTitle({
  post,
  setPreview,
}: {
  post: PostView
  setPreview: (post: PostView) => void
}) {
  useEffect(() => {
    const element = document.getElementById(`post-title-${getPostId(post)}`)
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
        id={`post-title-${getPostId(post)}`}
        href={`/post/${post.post.id}`}
        className={`text-transparent bg-clip-text bg-gradient-to-r hover:cursor-pointer hover:opacity-80 transition-opacity ${
          post.post.featured_community
            ? 'from-green-400 to-teal-500'
            : 'from-default-700 to-default-600'
        }`}
      >
        {getPostTitle(post)}
      </Link>
      {post.post.featured_community && (
        <Popover>
          <PopoverTrigger>
            <div className="text-teal-500 hover:cursor-pointer">
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
