import { PostView } from 'lemmy-js-client'
import { PostsFeedPost } from './PostsFeedPost'

export function PostsFeed({ posts }: { posts?: PostView[] }) {
  return (
    <div>
      {posts &&
        posts.map((post) => <PostsFeedPost key={post.post.id} post={post} />)}
    </div>
  )
}
