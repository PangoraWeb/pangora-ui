import { GetPostResponse, PostView } from 'lemmy-js-client'
import { Link } from '@nextui-org/react'
import PostNode from '../Post/PostNode'
import { useEffect, useState } from 'react'
import { getPost } from '@/shared/libs/Lemmy/post'

export function PostFeedPostPreview({
  post,
  setPreview,
}: {
  post: PostView
  setPreview: (post?: PostView) => void
}) {
  const [fetchedPost, setFetchedPost] = useState<GetPostResponse>()

  useEffect(() => {
    setFetchedPost(undefined)
    fetchPost()
    async function fetchPost() {
      setFetchedPost(await getPost({ id: post.post.id }))
    }
  }, [post])

  return (
    <div className="fixed z-20 flex w-full h-full left-0 top-14">
      <Link
        className="absolute w-full h-full bg-black bg-opacity-75 hover:cursor-pointer"
        onClick={() => setPreview()}
      ></Link>
      <div className="w-2/3 ml-[33%] absolute flex">
        <div className="w-full">
          {fetchedPost && (
            <PostNode
              post={fetchedPost?.post_view}
              duplicates={fetchedPost?.cross_posts}
            />
          )}
        </div>
      </div>
    </div>
  )
}
