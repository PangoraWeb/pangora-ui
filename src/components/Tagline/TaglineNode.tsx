'use client'

import { Tagline } from 'lemmy-js-client'
import { mdToHtml } from '@/shared/libs/Markdown'

export default function TaglineNode({ tagline }: { tagline: Tagline }) {
  return (
    <div
      className="text-sm rounded prose prose-sm max-w-none prose-quote border-l-2 py-1 px-5 mt-4 mb-2"
      dangerouslySetInnerHTML={
        tagline?.content
          ? mdToHtml(`${tagline.content}`)
          : mdToHtml('Loading quote...')
      }
    />
  )
}
