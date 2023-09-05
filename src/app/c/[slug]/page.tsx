import Community from '@/components/Community'
import SidebarCommunity from '@/components/SidebarCommunity'
import SidebarSite from '@/components/SidebarSite'

export default function Communities({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const fixedSlug = decodeURIComponent(params.slug)

  return (
    <div className="flex">
      <div className="min-w-2/3 max-w-2/3 w-2/3">
        <Community slug={fixedSlug} />
      </div>
      <div className="min-w-1/3 max-w-1/3 w-1/3">
        <SidebarCommunity slug={fixedSlug} />
        <SidebarSite />
      </div>
    </div>
  )
}
