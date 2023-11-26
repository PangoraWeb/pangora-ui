'use client'

import { Tagline } from 'lemmy-js-client'
import { mdToHtml } from '@/shared/libs/Markdown'
import { useEffect, useState } from 'react'
import { getRandomSiteTagline, getSite } from '@/shared/libs/Lemmy/site'

export default function Tagline() {
  const [tagline, setTagline] = useState<Tagline>()

  useEffect(() => {
    fetch()

    async function fetch() {
      setTagline(getRandomSiteTagline(await getSite()))
    }
  }, [])

  return (
    <div
      className="text-sm rounded prose prose-sm max-w-none prose-code:text-sm prose-quote border-l-2 py-1 px-5 mt-4 mb-2 border-default-300"
      dangerouslySetInnerHTML={
        tagline?.content
          ? mdToHtml(`${tagline.content}`)
          : mdToHtml('Loading quote...')
      }
    />
  )
}
