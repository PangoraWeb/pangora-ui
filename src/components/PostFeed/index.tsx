'use client'

import { PostView } from 'lemmy-js-client'
import { PostFeedPost } from './PostFeedPost'
import { useMemo, useState } from 'react'
import { PostFeedPostPreview } from './PostFeedPostPreview'

export function PostFeed({
  posts,
  defaultCollapseState,
}: {
  posts?: PostView[]
  defaultCollapseState?: boolean
}) {
  const [preview, setPreview] = useState<PostView>()

  const filteredPosts = useMemo(() => {
    const map = new Map<string, { post: PostView; duplicates: PostView[] }>()
    posts?.forEach((post) => {
      const key = post.post.url || post.post.id.toString()
      if (!map.has(key)) {
        map.set(key, { post, duplicates: [] })
      } else {
        map.get(key)?.duplicates.push(post)
      }
    })
    return Array.from(map.values())
  }, [posts])

  return (
    <div>
      {preview && (
        <PostFeedPostPreview post={preview} setPreview={setPreview} />
      )}
      <div className="mt-2 flex flex-col gap-2">
        {filteredPosts &&
          filteredPosts.map((filteredPost) => (
            <PostFeedPost
              key={filteredPost.post.post.id}
              post={filteredPost.post}
              duplicates={filteredPost.duplicates}
              defaultCollapseState={defaultCollapseState}
              setPreview={setPreview}
            />
          ))}
      </div>
    </div>
  )
}
