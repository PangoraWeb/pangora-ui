import { getPosts } from '@/shared/libs/Lemmy/post'
import HomeNode from './HomeNode'
import SidebarSite from '../SidebarSite'
import Tagline from '../Tagline'

export default async function HomePage() {
  const [localPosts, allPosts] = await Promise.all([
    getPosts({ sort: 'Active', type_: 'Local', limit: 50 }),
    getPosts({ sort: 'Active', type_: 'All', limit: 50 }),
  ])

  return (
    <div className="flex">
      <div className="w-full md:w-2/3">
        <Tagline />
        <HomeNode localPosts={localPosts.posts} allPosts={allPosts.posts} />
      </div>
      <div className="w-0 md:w-1/3">
        <SidebarSite />
      </div>
    </div>
  )
}
