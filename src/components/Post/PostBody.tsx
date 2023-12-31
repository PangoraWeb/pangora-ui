import { mdToHtml } from '@/shared/libs/Markdown'
import { PostView } from 'lemmy-js-client'

export default function PostBody({
  post,
  bodySourceActive,
}: {
  post: PostView
  bodySourceActive: boolean
}) {
  return (
    <div>
      {post.post.body ? (
        bodySourceActive ? (
          <pre className="prose dark:prose-invert prose-sm max-w-none prose-code:text-xs">
            {post.post.body}
          </pre>
        ) : (
          <div
            className="prose dark:prose-invert prose-sm max-w-none prose-code:text-xs"
            dangerouslySetInnerHTML={mdToHtml(post.post.body)}
          />
        )
      ) : (
        <></>
      )}
    </div>
  )
}
