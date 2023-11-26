import { getPost } from '@/shared/libs/Lemmy/post'
import PostNode from './PostNode'
import SidebarUser from '../SidebarUser'
import SidebarCommunity from '../SidebarCommunity'
import SidebarSite from '../SidebarSite'

export default async function Post({ id }: { id: number }) {
  const post = await getPost({ id: id })

  return (
    <div className="flex flex-row">
      <div className="w-2/3">
        <PostNode post={post.post_view} duplicates={post.cross_posts} />
      </div>
      <div className="w-1/3 flex flex-col py-2 p-4 flex flex-col gap-2">
        <SidebarUser id={post.post_view.creator.id} />
        <SidebarCommunity slug={post.community_view.community.name} />
        <SidebarSite />
      </div>
    </div>
  )
}
