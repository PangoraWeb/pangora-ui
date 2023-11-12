import ArrowDownIcon from '@/icons/ArrowDownIcon'
import ArrowUpIcon from '@/icons/ArrowUpIcon'
import { compactNumber } from '@/shared/libs/Number'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { PostView } from 'lemmy-js-client'

export default function PostScore({ post }: { post: PostView }) {
  return (
    <div className="text-default-500 mr-2 flex flex-col text-center text-base">
      <Button isIconOnly variant="light" className="text-default-500">
        <ArrowUpIcon />
      </Button>
      <Popover backdrop="opaque" placement="left">
        <PopoverTrigger>
          <Button isIconOnly variant="light" className="text-default-700">
            {compactNumber(post.counts.score)}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col text-center">
            <h5 className="text-lg underline">Stats</h5>
            <p>Upvotes: {post.counts.upvotes}</p>
            <p>
              Score: {post.counts.score} ({post.counts.upvotes} -{' '}
              {post.counts.downvotes})
            </p>
            <p>Downvotes: {post.counts.downvotes}</p>
          </div>
        </PopoverContent>
      </Popover>
      <Button isIconOnly variant="light" className="text-default-500">
        <ArrowDownIcon />
      </Button>
    </div>
  )
}

/*
<Button
        isIconOnly
        variant="light"
        disableRipple
        disableAnimation
        className="group"
      >
        <div
          className={`group-hover:transition-all duration-300 ease-in-out ${
            post.my_vote == 1 ? 'text-blue-500' : 'group-hover:text-green-500'
          }`}
        >
          <ArrowUpIcon />
        </div>
      </Button>
      <p>{compactNumber(post.counts.score)}</p>
      <Button isIconOnly variant="light">
        <div
          className={`group-hover:transition-all duration-300 ease-in-out ${
            post.my_vote == 1 ? 'text-blue-500' : 'group-hover:text-red-500'
          }`}
        >
          <ArrowDownIcon />
        </div>
      </Button>
*/
