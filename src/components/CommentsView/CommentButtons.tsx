import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { CommentView } from 'lemmy-js-client'
import { getCommentTime } from '@/shared/libs/Lemmy/comment'
import CommentActionButton from './CommentActionButton'
import MinusIcon from '@/icons/MinusIcon'
import ArrowBackUpIcon from '@/icons/ArrowBackUpIcon'
import LinkIcon from '@/icons/LinkIcon'
import MoreIcon from '@/icons/MoreIcon'
import PointIcon from '@/icons/PointIcon'

export function CommentButtons({
  comment,
  toggleCollapsed,
}: {
  comment: CommentView
  toggleCollapsed: () => void
}) {
  return (
    <div className="flex text-default-400">
      <div className="flex gap-2">
        <CommentActionButton
          selected={false}
          color="group-hover:text-rose-500"
          name="Minimize"
          onClick={() => toggleCollapsed()}
        >
          <MinusIcon />
        </CommentActionButton>
        <CommentActionButton
          selected={false}
          color="group-hover:text-yellow-500"
          name="Reply"
        >
          <ArrowBackUpIcon />
        </CommentActionButton>
        <CommentActionButton
          selected={false}
          color="group-hover:text-green-500"
          name="Copy Link"
        >
          <LinkIcon />
        </CommentActionButton>
        <Dropdown>
          <DropdownTrigger>
            <CommentActionButton
              selected={false}
              color="group-hover:text-default-600"
              name="More Actions"
            >
              <MoreIcon />
            </CommentActionButton>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem>Message</DropdownItem>
              <DropdownItem>Report</DropdownItem>
              <DropdownItem>Block User</DropdownItem>
              <DropdownItem>Save</DropdownItem>
              <DropdownItem>View Source</DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem>Remove</DropdownItem>
              <DropdownItem>Ban from Community</DropdownItem>
              <DropdownItem>Appoint as Mod</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex px-2">
        <PointIcon width={12} />
      </div>
      <p className="text-xs p-2">{comment && getCommentTime(comment)}</p>
    </div>
  )
}
