'use client'

import { Card, CardHeader } from '@nextui-org/card'
import { CommentView, PostView } from 'lemmy-js-client'
import { useEffect, useState } from 'react'
import PostScore from './PostScore'
import PostAuthor from './PostAuthor'
import PostTitle from './PostTitle'
import PostThumbnail from './PostThumbnail'
import { getComments } from '@/shared/libs/Lemmy/post'
import { CommentsView } from '../CommentsView'
import SidebarCommunity from '../SidebarCommunity'
import SidebarSite from '../SidebarSite'
import SidebarUser from '../SidebarUser'

export default function PostNode({ post }: { post: PostView }) {
  const [comments, setComments] = useState<CommentView[]>([])

  useEffect(() => {
    async function fetchData() {
      setComments(
        (
          await getComments({
            post_id: post.post.id,
            limit: 50,
          })
        ).comments
      )
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-row">
      <div className="w-2/3">
        <Card className="p-4 my-4 mx-1" isBlurred>
          <CardHeader className="flex justify-between">
            <div className="flex">
              <div>
                <PostScore post={post} />
              </div>
              <div className="flex flex-col items-center justify-center gap-5 mt-10">
                <div className="flex gap-5">
                  <PostAuthor post={post} />
                  <PostTitle post={post} />
                </div>
              </div>
            </div>
            <div>
              <PostThumbnail post={post} />
            </div>
          </CardHeader>
        </Card>
        <CommentsView post={post} comments={comments} />
      </div>
      <div className="w-1/3 flex flex-col py-2">
        <SidebarUser id={post.creator.id} />
        <SidebarCommunity slug={post.community.name} />
        <SidebarSite />
      </div>
    </div>
  )
}

/*
<div className="">
              <p>{getPostTime(currentPost)} {currentPost.post.}</p>
            </div>
*/

/*
<div className="flex flex-col">
          <div className="flex gap-5 items-center">
            <PostScore post={currentPost} />
            <PostAuthor post={currentPost} />
            <PostTitle post={currentPost} />
          </div>
          <p>{getPostTime(currentPost)}</p>
        </div>
        <PostThumbnail post={currentPost} />*/
