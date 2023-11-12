import { GetPersonDetailsResponse } from 'lemmy-js-client'
import { Card, CardBody, Image } from '@nextui-org/react'
import {
  getPersonAvatar,
  getPersonBio,
  getPersonName,
} from '@/shared/libs/Lemmy/person'

export function SidebarUserBanner({
  user,
  onClick,
}: {
  user: GetPersonDetailsResponse
  onClick: () => void
}) {
  return (
    <Card isPressable onClick={() => onClick()}>
      <CardBody className="absolute z-10">
        <div className="flex justify-center items-center">
          <Image
            src={getPersonAvatar(user.person_view)}
            width="40"
            height="40"
            alt="logo"
          />
          <div className="p-2">
            <p className="text-lg text-default-500">
              {getPersonName(user.person_view)}
            </p>
            <p className="text-xs text-default-400 whitespace-nowrap">
              {getPersonBio(user.person_view, 50)}
            </p>
          </div>
        </div>
      </CardBody>
      <Image
        removeWrapper
        src={user.person_view.person.banner}
        className="object-cover max-h-[100px] min-h-[100px] max-w-full min-w-full z-0 absolute"
      />
      <div className="bg-white dark:bg-black w-full h-[100px] z-11 opacity-90"></div>
    </Card>
  )
}
