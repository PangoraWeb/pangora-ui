import HomeFeed from '@/components/HomeFeed'
import SidebarSite from '@/components/SidebarSite'
import Tagline from '@/components/Tagline'
import SidebarCommunityList from '@/components/SidebarCommunityList'

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="flex">
      <div className="w-full md:w-2/3">
        <Tagline />
        <HomeFeed searchParams={searchParams} />
      </div>
      <div className="w-0 md:w-1/3 p-4 flex flex-col gap-2">
        <SidebarSite startButtonsShown={true} />
        <SidebarCommunityList type="TopDay" title="Active Communities" />
        <SidebarCommunityList type="New" title="New Communities" />
      </div>
    </div>
  )
}
