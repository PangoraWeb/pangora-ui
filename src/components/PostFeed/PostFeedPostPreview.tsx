import { GetPostResponse, PostView } from 'lemmy-js-client'

import PostNode from '../Post/PostNode'
import { useEffect, useState } from 'react'
import { getPost } from '@/shared/libs/Lemmy/post'
import SidebarUser from '../SidebarUser'
import SidebarCommunity from '../SidebarCommunity'
import { motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

export function PostFeedPostPreview({
  post,
  setPreview,
}: {
  post: PostView
  setPreview: (post?: PostView) => void
}) {
  const [fetchedPost, setFetchedPost] = useState<GetPostResponse>()
  const [oldURL, setOldURL] = useState<string>()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setFetchedPost(undefined)
    fetchPost()
    async function fetchPost() {
      setOldURL(`${pathname}?${searchParams.toString()}`)
      setFetchedPost(await getPost({ id: post.post.id }))
      window.history.replaceState(null, '', `/post/${post.post.id}`)
    }
  }, [post])

  return (
    <div className="fixed z-20 flex w-full h-full left-0 top-14">
      <motion.a
        animate={{
          opacity: [0, 1],
        }}
        className="absolute w-full h-full bg-black opacity-[.98] hover:opacity-[.97] hover:cursor-pointer"
        onClick={() => {
          window.history.replaceState(null, '', oldURL)
          setPreview()
        }}
      ></motion.a>
      <div className="w-3/4 ml-[25%] absolute flex overflow-y-auto h-[calc(100vh-50px)]">
        <div className="w-full">
          {fetchedPost && (
            <div className="w-full flex">
              <div className="w-2/3">
                <PostNode
                  post={fetchedPost?.post_view}
                  duplicates={fetchedPost?.cross_posts}
                />
              </div>
              <div className="w-1/3 flex flex-col py-2">
                <SidebarUser id={post.creator.id} />
                <SidebarCommunity slug={post.community.name} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
