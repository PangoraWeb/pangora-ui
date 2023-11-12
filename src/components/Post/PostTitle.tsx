import LinkIcon from '@/icons/LinkIcon'
import { getRelativePostLink } from '@/shared/libs/Lemmy/post'
import { mdToHtml } from '@/shared/libs/Markdown'
import { Link } from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'

export default function PostTitle({ post }: { post: PostView }) {
  return (
    <div className="flex flex-col">
      <Link
        href={getRelativePostLink(post)}
        className="text-lg text-default-700"
      >
        <div dangerouslySetInnerHTML={mdToHtml(post.post.name)} />
      </Link>
      {post.post.url && (
        <Link
          className="text-default-400 text-xs flex gap-1"
          href={post.post.url}
        >
          <LinkIcon width={16} />
          <p>{post.post.url}</p>
        </Link>
      )}
    </div>
  )
}
