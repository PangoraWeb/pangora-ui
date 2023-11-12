/*'use client'

import { mdToHtml } from '@/shared/libs/Markdown'
import { compactNumber } from '@/shared/libs/Number'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { GetPostResponse } from 'lemmy-js-client'
import React, { useState } from 'react'
import ViewSourceButton from './ViewSourceButton'

interface PostViewArgs {
  post?: GetPostResponse
}

export function PostViewNode({ post }: PostViewArgs) {
  const [viewSource, setViewSource] = useState(false)
  const handleToggle = (isToggled: boolean) => {
    setViewSource(isToggled)
  }

  return (
    <Card className="p-4 my-4 mx-1" isBlurred>
      <CardHeader className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div className="text-slate-500 mr-2 flex flex-col text-center text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-5 -4.5 24 24"
              width="24"
              fill="currentColor"
              className="w-full"
            >
              <path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"></path>
            </svg>
            <p className="w-full">
              {compactNumber(post?.post_view.counts.score)}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-5 -4.5 24 24"
              width="24"
              fill="currentColor"
              className="w-full"
            >
              <path d="M8 11.243l3.95-3.95a1 1 0 1 1 1.414 1.414l-5.657 5.657a.997.997 0 0 1-1.414 0L.636 8.707A1 1 0 1 1 2.05 7.293L6 11.243V1.657a1 1 0 1 1 2 0v9.586z"></path>
            </svg>
          </div>
          <Badge
            content={
              <Avatar
                isBordered
                radius="full"
                size="sm"
                src={post?.post_view.creator.avatar}
                className="w-3 h-3"
              />
            }
            color="success"
            placement="bottom-right"
          >
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={post?.post_view.community.icon}
            />
          </Badge>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {post?.post_view.community.title ??
                post?.post_view.community.name}
            </h4>
            <div className="flex items-start items-center">
              <h5 className="text-small tracking-tight text-default-400">
                {post?.post_view.creator.display_name ??
                  post?.post_view.creator.name}
              </h5>
              {post?.post_view.creator.bot_account && (
                <div className="text-xs ml-1 px-1 border-default-100 border-1 bg-default-200 rounded text-default-600">
                  Bot
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="text-lg"
              dangerouslySetInnerHTML={mdToHtml(post?.post_view.post.name)}
            />
            <div className="flex text-xs text-gray-500">
              {post?.post_view.post.url && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-3 -3 24 24"
                    width="16"
                    fill="currentColor"
                  >
                    <path d="M3.19 9.345a.97.97 0 0 1 1.37 0 .966.966 0 0 1 0 1.367l-2.055 2.052a1.932 1.932 0 0 0 0 2.735 1.94 1.94 0 0 0 2.74 0l4.794-4.787a.966.966 0 0 0 0-1.367.966.966 0 0 1 0-1.368.97.97 0 0 1 1.37 0 2.898 2.898 0 0 1 0 4.103l-4.795 4.787a3.879 3.879 0 0 1-5.48 0 3.864 3.864 0 0 1 0-5.47L3.19 9.344zm11.62-.69a.97.97 0 0 1-1.37 0 .966.966 0 0 1 0-1.367l2.055-2.052a1.932 1.932 0 0 0 0-2.735 1.94 1.94 0 0 0-2.74 0L7.962 7.288a.966.966 0 0 0 0 1.367.966.966 0 0 1 0 1.368.97.97 0 0 1-1.37 0 2.898 2.898 0 0 1 0-4.103l4.795-4.787a3.879 3.879 0 0 1 5.48 0 3.864 3.864 0 0 1 0 5.47L14.81 8.656z"></path>
                  </svg>
                  <p className="ml-1">{post?.post_view.post.url}</p>
                </>
              )}
              {post?.post_view.post.body && (
                <ViewSourceButton onToggle={handleToggle} />
              )}
            </div>
          </div>
        </div>
        {post?.post_view.post.thumbnail_url ?? post?.post_view.post.url ? (
          <Popover
            className="bg-transparent"
            backdrop="opaque"
            classNames={{
              base: 'max-w-[80%] max-h-[80%] p-0 m-0 flex justify-center',
            }}
          >
            <PopoverTrigger>
              <Button className="w-[150px] h-[100px] min-w-[150px] min-h-[100px]">
                <Image
                  src={
                    post?.post_view.post.thumbnail_url ??
                    post?.post_view.post.url
                  }
                  height={180}
                  width={100}
                  className="w-[150px] h-[100px] min-w-[150px] min-h-[100px]"
                  classNames={{
                    wrapper: 'w-[150px] h-[100px] min-w-[150px] min-h-[100px]',
                  }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Image
                src={
                  post?.post_view.post.thumbnail_url ?? post?.post_view.post.url
                }
                className=""
                classNames={{
                  wrapper: '',
                }}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Card className="items-center justify-center w-[150px] h-[100px] min-w-[150px] min-h-[100px] bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -2.5 24 24"
              width="24"
              fill="currentColor"
            >
              <path d="M9.378 12H17a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1 1 1 0 0 1 1 1v3.013L9.378 12zM3 0h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.958l-6.444 4.808A1 1 0 0 1 2 18.006V14a2 2 0 0 1-2-2V3a3 3 0 0 1 3-3z"></path>
            </svg>
          </Card>
        )}
      </CardHeader>
      {post?.post_view.post.body && (
        <div>
          <hr className="border-gray-700 m-2" />
          <CardBody>
            <div>
              {post?.post_view.post.body ? (
                viewSource ? (
                  <pre className="prose prose-invert prose-sm max-w-none">
                    {post.post_view.post.body}
                  </pre>
                ) : (
                  <div
                    className="prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={mdToHtml(post.post_view.post.body)}
                  />
                )
              ) : (
                <></>
              )}
            </div>
          </CardBody>
        </div>
      )}
    </Card>
  )
}

/*
<div className="border-2 border-slate-400 rounded-lg p-4 m-4">
      <div className="flex justify-center items-center">
        <Image
          as={NextImage}
          width={90}
          height={90}
          alt=""
          src={post?.post_view.post.url}
        ></Image>
        <div className="flex flex-col">
          <div dangerouslySetInnerHTML={mdToHtml(post?.post_view.post.name)} />
          <div
            className="prose prose-invert"
            dangerouslySetInnerHTML={mdToHtml(post?.post_view.post.body)}
          />
        </div>
      </div>
    </div>
*/
