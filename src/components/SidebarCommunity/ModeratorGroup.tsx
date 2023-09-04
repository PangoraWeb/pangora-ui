'use client'

import { getPersonTag } from '@/shared/libs/Lemmy/person'
import { mdToHtml } from '@/shared/libs/Markdown'
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from '@nextui-org/react'
import { CommunityModeratorView } from 'lemmy-js-client'

export default function ModeratorGroup({
  moderators,
}: {
  moderators: CommunityModeratorView[]
}) {
  return (
    <Card className="m-2 mx-3 flex justify-center text-xs" isBlurred>
      <CardHeader>Community Moderators</CardHeader>
      <CardBody>
        <AvatarGroup max={20}>
          {moderators.map((moderator) => (
            <Tooltip
              key={moderator.moderator.id}
              showArrow
              content={
                <div>
                  <div className="px-2 py-2">
                    <div className="flex">
                      <Avatar src={moderator.moderator.avatar} isBordered />
                      <div className="ml-3">
                        <h6 className="text-sm font-bold flex text-center items-center">
                          {moderator.moderator.display_name ??
                            moderator.moderator.name}
                          {moderator.moderator.bot_account && (
                            <div className="ml-1 px-1 border-default-100 border-1 bg-default-200 rounded-lg text-default-400">
                              Bot
                            </div>
                          )}
                        </h6>
                        <h6 className="text-xs">
                          {getPersonTag(moderator.moderator)}
                        </h6>
                      </div>
                    </div>
                    <p
                      className="text-xs py-3"
                      dangerouslySetInnerHTML={mdToHtml(
                        moderator.moderator.bio
                      )}
                    ></p>
                    <div className="flex py-2 justify-center">
                      <Button
                        className="mx-1"
                        radius="full"
                        size="sm"
                        isDisabled
                      >
                        Message
                      </Button>
                      {moderator.moderator.matrix_user_id && (
                        <Button
                          className="mx-1"
                          radius="full"
                          size="sm"
                          isDisabled
                        >
                          {`Secure Message`}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              }
              className="flex"
              classNames={{
                base: `dark max-w-sm`,
              }}
            >
              <Avatar src={moderator.moderator.avatar} isBordered />
            </Tooltip>
          ))}
        </AvatarGroup>
      </CardBody>
    </Card>
  )
}
