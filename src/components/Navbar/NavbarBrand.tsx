import { NavbarBrand as NavbarBrandBase } from '@nextui-org/react'
import Image from 'next/image'
import NavbarLink from './NavbarLink'

export default function NavbarBrand({
  name,
  icon,
}: {
  name: string
  icon: string
}) {
  return (
    <NavbarBrandBase className="grow-0 h-full">
      <NavbarLink
        link="/"
        tooltip={{
          title: 'Homepage',
          description: 'Go to the sites home page.',
          key: 'Z',
        }}
      >
        <Image
          src={icon}
          alt="site icon"
          width="48"
          height="48"
          className="mr-2 rounded-md min-w-[48px] min-h-[48px]"
        />
        <h1>{name}</h1>
      </NavbarLink>
    </NavbarBrandBase>
  )
}
