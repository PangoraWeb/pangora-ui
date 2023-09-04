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
import { PersonView } from 'lemmy-js-client'

export default function AdminGroup({ admins }: { admins: PersonView[] }) {
  return (
    <Card className="m-2 mx-3 flex justify-center text-xs" isBlurred>
      <CardHeader>Site Admins</CardHeader>
      <CardBody>
        <AvatarGroup max={20}>
          {admins.map((admin) => (
            <Tooltip
              key={admin.person.id}
              showArrow
              content={
                <div>
                  <div className="px-2 py-2">
                    <div className="flex">
                      <Avatar src={admin.person.avatar} isBordered />
                      <div className="ml-3">
                        <h6 className="text-sm font-bold flex text-center items-center">
                          {admin.person.display_name ?? admin.person.name}
                          {admin.person.bot_account && (
                            <div className="ml-1 px-1 border-default-100 border-1 bg-default-200 rounded-lg text-default-400">
                              Bot
                            </div>
                          )}
                        </h6>
                        <h6 className="text-xs">
                          {getPersonTag(admin.person)}
                        </h6>
                      </div>
                    </div>
                    <p
                      className="text-xs py-3"
                      dangerouslySetInnerHTML={mdToHtml(admin.person.bio)}
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
                      {admin.person.matrix_user_id && (
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
              <Avatar src={admin.person.avatar} isBordered />
            </Tooltip>
          ))}
        </AvatarGroup>
      </CardBody>
    </Card>
  )
}
