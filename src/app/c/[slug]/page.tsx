import Community from '@/components/Community'
import SidebarCommunity from '@/components/SidebarCommunity'
import SidebarSite from '@/components/SidebarSite'

export default function Communities({
  params,
  searchParams,
}: {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const fixedSlug = decodeURIComponent(params.slug)

  return (
    <div className="flex">
      <div className="min-w-2/3 max-w-2/3 w-2/3">
        <Community slug={fixedSlug} searchParams={searchParams} />
      </div>
      <div className="min-w-1/3 max-w-1/3 w-1/3 p-4 flex flex-col gap-2">
        <SidebarCommunity slug={fixedSlug} startButtonsShown={true} />
        <SidebarSite />
      </div>
    </div>
  )
}
