import { Button, ButtonGroup } from '@nextui-org/react'
import { useState } from 'react'
import DocumentIcon from '@/icons/DocumentIcon'
import BarIcon from '@/icons/BarIcon'
import UserIcon from '@/icons/UserIcon'

export function SidebarCommunityButtons() {
  const [descriptionShown, setDescriptionShown] = useState(false)
  const [modsShown, setModsShown] = useState(false)
  const [statsShown, setStatsShown] = useState(false)

  function toggleDescription() {
    setDescriptionShown(!descriptionShown)
  }

  function toggleMods() {
    setModsShown(!modsShown)
  }

  function toggleStats() {
    setStatsShown(!statsShown)
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
          className="text-default-400 hover:text-emerald-500 bg-neutral-100 dark:bg-neutral-900"
          onClick={() => toggleStats()}
        >
          <BarIcon />
        </Button>
        <Button
          isIconOnly
          className="text-default-400 hover:text-purple-500 bg-neutral-100 dark:bg-neutral-900 hover:opacity-100"
          onClick={() => toggleMods()}
        >
          <UserIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}

/*
<Button
          onClick={() => {
            hideCommunity(community.community_view)
          }}
        >
          Hide Community
        </Button>
*/
