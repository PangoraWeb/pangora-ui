import HomeFeed from '@/components/HomeFeed'
import SidebarSite from '@/components/SidebarSite'
import Tagline from '@/components/Tagline'

export default function HomePage() {
  return (
    <div className="flex">
      <div className="w-full md:w-2/3">
        <Tagline />
        <HomeFeed />
      </div>
      <div className="w-0 md:w-1/3">
        <SidebarSite startButtonsShown={true} />
      </div>
    </div>
  )
}
