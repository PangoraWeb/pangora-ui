import { PostView } from 'lemmy-js-client'
import { Link } from '@nextui-org/react'
import PostNode from '../Post/PostNode'

export function PostFeedPostPreview({
  post,
  setPreview,
}: {
  post: PostView
  setPreview: (post?: PostView) => void
}) {
  return (
    <div className="fixed z-20 flex w-full h-full left-0 top-14">
      <Link
        className="absolute w-full h-full bg-black bg-opacity-75 hover:cursor-pointer"
        onClick={() => setPreview()}
      ></Link>
      <div className="w-2/3 ml-[33%] absolute flex">
        <div className="w-full">
          <PostNode post={post} />
        </div>
      </div>
    </div>
  )
}
