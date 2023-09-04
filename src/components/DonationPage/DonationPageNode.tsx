'use client'

import { getSiteIcon } from '@/shared/libs/Lemmy/site'
import { Button, Image } from '@nextui-org/react'
import { GetSiteResponse } from 'lemmy-js-client'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'

export default function DonationPageNode({ site }: { site: GetSiteResponse }) {
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
      <h2 className="text-3xl">Donate</h2>
      <p>
        We are a free open source site that relies on donations to keep
        ourselves running
      </p>
      <Button
        className="mt-4"
        onClick={() => router.push('https://github.com/sponsors/snowe2010/')}
      >
        Go to the donation page
      </Button>
      <div className="p-[3%]" />
    </div>
  )
}
