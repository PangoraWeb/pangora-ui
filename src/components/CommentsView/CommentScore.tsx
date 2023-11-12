import { CommentView } from 'lemmy-js-client'
import ArrowUpIcon from '@/icons/ArrowUpIcon'
import ArrowDownIcon from '@/icons/ArrowDownIcon'

export function CommentScore({ comment }: { comment: CommentView }) {
  return (
    <div className="text-slate-500 mr-2 flex flex-col text-center text-sm">
      <ArrowUpIcon width={18} />
      <p className="w-full">{comment?.counts.score}</p>
      <ArrowDownIcon width={18} />
    </div>
  )
}
