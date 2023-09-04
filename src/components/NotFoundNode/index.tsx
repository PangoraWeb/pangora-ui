'use client'

import { getSiteIcon } from '@/shared/libs/Lemmy/site'
import { Button, Image } from '@nextui-org/react'
import { GetSiteResponse } from 'lemmy-js-client'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFoundNode({ site }: { site: GetSiteResponse }) {
  const router = useRouter()

  return (
    <div className="fixed flex flex-col items-center justify-center  md:w-[748px] lg:w-[1004px] xl:w-[1260px] 2xl:w-[1516px] h-screen">
      <Image
        as={NextImage}
        src={getSiteIcon(site)}
        alt="site icon"
        width="96"
        height="96"
        className="mr-2 rounded-md min-w-[96px] min-h-[96px]"
        isBlurred
        disableSkeleton
      />
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <Button className="mt-4" onClick={() => router.back()}>
        Back to Previous Page
      </Button>
      <div className="p-[3%]" />
    </div>
  )
}
