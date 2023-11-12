import { getRelativePostLink } from '@/shared/libs/Lemmy/post'
import { mdToHtml } from '@/shared/libs/Markdown'
import { PostView } from 'lemmy-js-client'
import Link from 'next/link'

export default function PostTitle({ post }: { post: PostView }) {
  return (
    <div className="flex flex-col">
      <Link
        href={getRelativePostLink(post)}
        className="text-lg"
        dangerouslySetInnerHTML={mdToHtml(post.post.name)}
      />
      {post.post.url && (
        <div className="flex text-xs text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-3 -3 24 24"
            width="16"
            fill="currentColor"
          >
            <path d="M3.19 9.345a.97.97 0 0 1 1.37 0 .966.966 0 0 1 0 1.367l-2.055 2.052a1.932 1.932 0 0 0 0 2.735 1.94 1.94 0 0 0 2.74 0l4.794-4.787a.966.966 0 0 0 0-1.367.966.966 0 0 1 0-1.368.97.97 0 0 1 1.37 0 2.898 2.898 0 0 1 0 4.103l-4.795 4.787a3.879 3.879 0 0 1-5.48 0 3.864 3.864 0 0 1 0-5.47L3.19 9.344zm11.62-.69a.97.97 0 0 1-1.37 0 .966.966 0 0 1 0-1.367l2.055-2.052a1.932 1.932 0 0 0 0-2.735 1.94 1.94 0 0 0-2.74 0L7.962 7.288a.966.966 0 0 0 0 1.367.966.966 0 0 1 0 1.368.97.97 0 0 1-1.37 0 2.898 2.898 0 0 1 0-4.103l4.795-4.787a3.879 3.879 0 0 1 5.48 0 3.864 3.864 0 0 1 0 5.47L14.81 8.656z"></path>
          </svg>
          <p>{post.post.url}</p>
        </div>
      )}
    </div>
  )
}