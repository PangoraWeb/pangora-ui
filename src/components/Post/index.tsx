import { getPost } from '@/shared/libs/Lemmy/post'
import PostNode from './PostNode'

export default async function Post({ id }: { id: number }) {
  const post = await getPost({ id: id })

  return (
    <div>
      <PostNode post={post.post_view} />
    </div>
  )
}
