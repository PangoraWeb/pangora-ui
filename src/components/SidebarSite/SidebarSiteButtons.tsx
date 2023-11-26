import { GetSiteResponse } from 'lemmy-js-client'
import { Button, ButtonGroup, Card, CardBody, Link } from '@nextui-org/react'
import DocumentIcon from '@/icons/DocumentIcon'
import DatabaseIcon from '@/icons/DatabaseIcon'
import ScaleIcon from '@/icons/ScaleIcon'
import ToolsIcon from '@/icons/ToolsIcon'
import HeartIcon from '@/icons/HeartIcon'
import BarIcon from '@/icons/BarIcon'
import { useState } from 'react'
import { mdToHtml } from '@/shared/libs/Markdown'
import UserIcon from '@/icons/UserIcon'
import AdminGroup from './AdminGroup'

export function SidebarSiteButtons({ site }: { site: GetSiteResponse }) {
  const [descriptionShown, setDescriptionShown] = useState(false)
  const [statsShown, setStatsShown] = useState(false)
  const [adminsShown, setAdminsShown] = useState(false)

  function toggleStats() {
    setStatsShown(!statsShown)
  }

  function toggleDescription() {
    setDescriptionShown(!descriptionShown)
  }

  function toggleAdmins() {
    setAdminsShown(!adminsShown)
  }

  return (
    <div className="flex justify-center items-center flex-col gap-1">
      <ButtonGroup variant="solid">
        <Button
          isIconOnly
          className="text-default-400 hover:text-green-500 bg-neutral-100 dark:bg-neutral-900"
          onClick={() => toggleDescription()}
        >
          <DocumentIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-amber-500 bg-neutral-100 dark:bg-neutral-900 hover:opacity-100"
          as={Link}
          href="/modlog"
        >
          <ToolsIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-yellow-500 bg-neutral-100 dark:bg-neutral-900 hover:opacity-100"
          as={Link}
          href="/legal"
        >
          <ScaleIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-teal-500 bg-neutral-100 dark:bg-neutral-900 hover:opacity-100"
          as={Link}
          href="/instances"
        >
          <DatabaseIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-emerald-500 bg-neutral-100 dark:bg-neutral-900"
          onClick={() => toggleStats()}
        >
          <BarIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-purple-500 bg-neutral-100 dark:bg-neutral-900 hover:opacity-100"
          onClick={() => toggleAdmins()}
        >
          <UserIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-red-500 bg-neutral-100 dark:bg-neutral-900 hover:opacity-100"
          as={Link}
          href="/donate"
        >
          <HeartIcon />
        </Button>
      </ButtonGroup>
      {descriptionShown && (
        <Card className="bg-neutral-100 dark:bg-neutral-900">
          <CardBody>
            <div
              dangerouslySetInnerHTML={mdToHtml(
                site?.site_view.site.sidebar ?? ''
              )}
              className="prose mt-6 dark:prose-invert prose-img:my-1 prose-sm p-4 prose-code:text-xs"
            ></div>
          </CardBody>
        </Card>
      )}
      {statsShown && <div></div>}
      {adminsShown && <AdminGroup admins={site?.admins ?? []} />}
    </div>
  )
}
