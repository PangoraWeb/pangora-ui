'use client'

import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { CommentView, PostView } from 'lemmy-js-client'
import { useEffect, useState } from 'react'
import PostScore from './PostScore'
import PostAuthor from './PostAuthor'
import PostTitle from './PostTitle'
import PostThumbnail from './PostThumbnail'
import { getComments } from '@/shared/libs/Lemmy/post'
import { CommentsView } from '../CommentsView'
import PostBody from './PostBody'
import PostButtons from './PostButtons'

export default function PostNode({
  post,
  duplicates,
}: {
  post: PostView
  duplicates: PostView[]
}) {
  const [comments, setComments] = useState<CommentView[]>([])
  const [bodySourceActive, setBodySourceActive] = useState(false)
  const [commentsShown, setCommentsShown] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const duplicatePostComments = await Promise.all(
        duplicates.map((post) =>
          getComments({
            post_id: post.post.id,
            limit: 50,
            type_: 'All',
          })
        )
      )
      const duplicateComments = duplicatePostComments
        .map((comment) => comment.comments)
        .flat()

      setComments([
        ...(
          await getComments({
            post_id: post.post.id,
            limit: 50,
            type_: 'All',
          })
        ).comments,
        ...duplicateComments,
      ])
    }
    fetchData()
  }, [])

  function toggleBodySource() {
    setBodySourceActive(!bodySourceActive)
  }

  function toggleComments() {
    setCommentsShown(!commentsShown)
  }

  return (
    <div>
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
        {post.post.body && (
          <div>
            <hr className="border-gray-700 m-2" />
            <CardBody>
              <PostBody bodySourceActive={bodySourceActive} post={post} />
            </CardBody>
          </div>
        )}
      </Card>
      <PostButtons
        post={post}
        toggleBodySource={toggleBodySource}
        bodySourceActive={bodySourceActive}
        duplicates={duplicates}
        toggleComments={toggleComments}
      />
      {commentsShown && <CommentsView post={post} comments={comments} />}
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
