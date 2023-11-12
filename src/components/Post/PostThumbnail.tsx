import {
  Button,
  Card,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'

export default function PostThumbnail({ post }: { post: PostView }) {
  return (
    <div>
      {post.post.thumbnail_url ?? post.post.url ? (
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
                src={post.post.thumbnail_url ?? post.post.url}
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
              src={post.post.thumbnail_url ?? post.post.url}
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
    </div>
  )
}
