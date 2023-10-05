import {
  getCommunityInstance,
  getRelativeCommunityLink,
} from '@/shared/libs/Lemmy/community'
import { getPostTime } from '@/shared/libs/Lemmy/post'
import { compactNumber } from '@/shared/libs/Number'
import { Avatar, Card, CardBody, Image } from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'
import Link from 'next/link'

export function PostsFeedPost({ post }: { post: PostView }) {
  return (
    <Card className="my-2" isBlurred>
      <CardBody>
        <div className="flex flex-row items-center rounded-lg">
          <div className="text-default-400 mr-2 text-center pr-2 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-5 -4.5 24 24"
              width="24"
              fill="currentColor"
            >
              <path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"></path>
            </svg>
            <p>{compactNumber(post.counts.score)}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-5 -4.5 24 24"
              width="24"
              fill="currentColor"
            >
              <path d="M8 11.243l3.95-3.95a1 1 0 1 1 1.414 1.414l-5.657 5.657a.997.997 0 0 1-1.414 0L.636 8.707A1 1 0 1 1 2.05 7.293L6 11.243V1.657a1 1 0 1 1 2 0v9.586z"></path>
            </svg>
          </div>
          {post.post.thumbnail_url && (
            <Image
              src={post.post.thumbnail_url}
              alt="alt"
              width="90"
              height="90"
              className="rounded-lg max-h-[90px] min-h-[90px] max-w-[90px] min-w-[90px]"
            />
          )}
          {!post.post.thumbnail_url && (
            <div className="h-[90px] w-[90px] max-w-[90px] min-w-[90px] flex items-center justify-center bg-default-50 bg-opacity-30 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -2.5 24 24"
                width="24"
                fill="currentColor"
              >
                <path d="M9.378 12H17a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1 1 1 0 0 1 1 1v3.013L9.378 12zM3 0h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.958l-6.444 4.808A1 1 0 0 1 2 18.006V14a2 2 0 0 1-2-2V3a3 3 0 0 1 3-3z"></path>
              </svg>
            </div>
          )}
          <div className="m-2">
            <div className="flex items-center">
              <Link className="text-xl px-1" href={`/post/${post.post.id}`}>
                {post.post.name}
              </Link>
            </div>
            <div className="flex text-sm items-center">
              <div
                className={`flex items-center p-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500`}
              >
                <Avatar
                  src={post.creator.avatar}
                  alt="alt"
                  size="sm"
                  className="rounded-full  max-h-[24px]  max-w-[24px]"
                />
                <p className="ml-2 pb-1">
                  {post.creator.display_name ?? post.creator.name}
                </p>
                {post.creator.bot_account && (
                  <div className="text-xs ml-1 px-1 mb-1 border-default-100 border-1 bg-default-200 rounded text-default-600">
                    Bot
                  </div>
                )}
              </div>
              <p className="pb-1 pl-1">to</p>
              <Link
                href={getRelativeCommunityLink(post.community)}
                className={`flex items-center p-1 m-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500`}
              >
                <Image
                  src={post.community.icon}
                  alt="alt"
                  width="24"
                  height="24"
                  className="rounded-full mb-1"
                />
                <p className="ml-2 pb-1">
                  {post.community.title} ({getCommunityInstance(post.community)}
                  )
                </p>
              </Link>
              <p className="p-1 text-default-400">•</p>
              <p className="text-default-400">{post && getPostTime(post)}</p>
            </div>
            <div className="flex items-center text-slate-400 p-1 text-sm">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2 -2.5 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M9.378 12H17a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1 1 1 0 0 1 1 1v3.013L9.378 12zM3 0h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.958l-6.444 4.808A1 1 0 0 1 2 18.006V14a2 2 0 0 1-2-2V3a3 3 0 0 1 3-3z"></path>
                </svg>
                <p className="px-2">{post.counts.comments}</p>
              </div>
              <div className="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2 -2.5 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M10 13.554l3.517 1.85-.672-3.917 2.846-2.774-3.932-.571L10 4.579 8.241 8.142l-3.932.571 2.846 2.774-.672 3.916L10 13.554zm0 2.26L3.827 19.06l1.179-6.875L.01 7.317l6.902-1.003L10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814z"></path>
                </svg>
              </div>
              <div className="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-3 -2 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M6 15H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3h3l3 3v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3zm0-2V7a2 2 0 0 1 2-2h2V2H2v11h4zm8.172-6H8v11h8V8.828L14.172 7z"></path>
                </svg>
              </div>
              <div className="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-9 -2 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M3 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 14a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
