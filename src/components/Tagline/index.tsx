import { Tagline } from 'lemmy-js-client'
import { mdToHtml } from '@/shared/libs/Markdown'
import { getRandomSiteTagline, getSite } from '@/shared/libs/Lemmy/site'

export default async function Tagline() {
  const tagline = getRandomSiteTagline(await getSite())

  return (
    <div>
      {tagline && (
        <div
          className="text-sm rounded prose prose-sm max-w-none prose-code:text-sm prose-quote border-l-2 py-1 px-5 mt-4 mb-2 border-default-300"
          dangerouslySetInnerHTML={mdToHtml(`${tagline.content}`)}
        />
      )}
    </div>
  )
}
