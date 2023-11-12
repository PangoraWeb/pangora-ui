import { Card, CardBody } from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'
import { PostFeedPostThumbnail } from './PostFeedPostThumbnail'
import { PostFeedPostInformation } from './PostFeedPostInformation'
import { PostFeedPostVote } from './PostFeedPostVote'
import { useEffect, useState } from 'react'
import { PostFeedPostCollapsedVote } from './PostFeedPostCollapsedVote'
import { PostFeedPostCollapsedThumbnail } from './PostFeedPostCollapsedThumbnail'
import { PostFeedPostCollapsedInformation } from './PostFeedPostCollapsedInformation'
import { PostFeedPostCollapsedButtons } from './PostFeedPostCollapsedButtons'

export function PostFeedPost({
  post,
  duplicates,
  defaultCollapseState,
  setPreview,
}: {
  post: PostView
  duplicates: PostView[]
  defaultCollapseState?: boolean
  setPreview: (post: PostView) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    setCollapsed(defaultCollapseState || post.counts.score <= 0)
  }, [defaultCollapseState])

  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <div>
      <Card isBlurred>
        <CardBody className={`${collapsed ? 'px-5 py-2' : 'p-5'}`}>
          {collapsed ? (
            <div className="flex justify-between">
              <div className="flex flex-row items-stretch gap-4">
                <PostFeedPostCollapsedVote post={post} />
                <PostFeedPostCollapsedThumbnail post={post} />
                <PostFeedPostCollapsedInformation
                  post={post}
                  setPreview={setPreview}
                />
              </div>
              <PostFeedPostCollapsedButtons
                post={post}
                duplicates={duplicates}
                toggleCollapsed={toggleCollapsed}
                setPreview={setPreview}
              />
            </div>
          ) : (
            <div className="flex flex-row items-stretch gap-4">
              <PostFeedPostVote post={post} />
              <PostFeedPostThumbnail post={post} />
              <PostFeedPostInformation
                post={post}
                duplicates={duplicates}
                toggleCollapsed={toggleCollapsed}
                setPreview={setPreview}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
