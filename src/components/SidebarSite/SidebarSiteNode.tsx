'use client'

import { GetSiteResponse } from 'lemmy-js-client'
import { SidebarSiteBanner } from './SidebarSiteBanner'
import { useState } from 'react'
import { SidebarSiteButtons } from './SidebarSiteButtons'

export default function SidebarSiteNode({
  startButtonsShown = false,
  site,
}: {
  startButtonsShown?: boolean
  site: GetSiteResponse
}) {
  const [showButtons, setShowButtons] = useState(startButtonsShown)

  function toggleButtons() {
    setShowButtons(!showButtons)
  }

  return (
    <div className="flex flex-col gap-1">
      <SidebarSiteBanner site={site} onClick={() => toggleButtons()} />
      {showButtons && <SidebarSiteButtons site={site} />}
    </div>
  )
}
