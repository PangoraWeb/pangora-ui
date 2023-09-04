'use client'

import {
  Navbar as NavBase,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Link,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Button,
  DropdownSection,
  Kbd,
} from '@nextui-org/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { GetSiteResponse } from 'lemmy-js-client'
import { getSiteIcon, getSiteName } from '@/shared/libs/Lemmy/site'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTheme } from 'next-themes'
import NavbarLink from './NavbarLink'
import NavbarButton from './NavbarButton'

export default function NavbarNode({ site }: { site: GetSiteResponse }) {
  // Hotkeys
  const router = useRouter()
  useHotkeys('z', () => router.push('/'))
  useHotkeys('x', () => router.push('/communities'))
  //useHotkeys('c', () => router.push('/create_post'))
  //useHotkeys('v', () => router.push('/c/community_request'))
  useHotkeys('b', () => router.push('/donate'))

  // Themes
  const { theme, setTheme } = useTheme()

  useHotkeys('q', () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  })

  // Main
  return (
    <NavBase
      isBordered
      maxWidth="2xl"
      classNames={{
        item: 'flex items-center h-full',
      }}
    >
      <NavbarBrand className="grow-0">
        <Link as={NextLink} href="/">
          <Image
            as={NextImage}
            src={getSiteIcon(site)}
            alt="site icon"
            width="48"
            height="48"
            className="mr-2 rounded-md min-w-[48px] min-h-[48px]"
            isBlurred
            disableSkeleton
          />
          <h1>{getSiteName(site)}</h1>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarLink
          tooltip={{
            title: 'Community List',
            description:
              'Allows you to browse all of the communities on the site.',
            key: 'X',
          }}
          link="/communities"
        >
          Communities
        </NavbarLink>

        <NavbarLink
          tooltip={{
            title: 'Create Post',
            description: 'Start the creation of a post on the site.',
            key: 'C',
          }}
          link="/create_post"
          disabled
        >
          Create Post
        </NavbarLink>

        <NavbarItem>
          <NavbarLink
            tooltip={{
              title: 'Request Community',
              description:
                'Go to our section for community suggestions! Communities will be added if theres anough interest and it fits the site.',
              key: 'V',
            }}
            link="/c/community_request"
            disabled
          >
            Request Community
          </NavbarLink>
        </NavbarItem>

        <NavbarItem>
          <NavbarLink
            tooltip={{
              title: 'Donate',
              description:
                'We are a free open-source site that relies on donations to keep ourselves running.',
              key: 'B',
            }}
            link="/donate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -4 24 24"
              width="22"
              fill="currentColor"
            >
              <path d="M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z"></path>
            </svg>
          </NavbarLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Input
            isDisabled
            endContent={<Kbd>S</Kbd>}
            classNames={{
              base: 'max-w-full sm:max-w-[14rem] h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper: 'h-full font-normal',
            }}
            labelPlacement="inside"
            placeholder="Search..."
            size="md"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2.5 -2.5 24 24"
                width="22"
                fill="currentColor"
              >
                <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path>
              </svg>
            }
            type="search"
          />
        </NavbarItem>

        <NavbarItem>
          <Dropdown placement="bottom-end" isDisabled>
            <DropdownTrigger>
              <Button isIconOnly isDisabled className="bg-default-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-5 -8 24 24"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z"></path>
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
            >
              <DropdownSection title="Search Categories" showDivider>
                <DropdownItem key="all" description="Search for everything">
                  All
                </DropdownItem>
                <DropdownItem key="comments" description="Search for comments">
                  Comments
                </DropdownItem>
                <DropdownItem key="posts" description="Search for posts">
                  Posts
                </DropdownItem>
                <DropdownItem
                  key="communities"
                  description="Search for communities"
                >
                  Communities
                </DropdownItem>
                <DropdownItem key="users" description="Search for users">
                  Users
                </DropdownItem>
                <DropdownItem key="url" description="Search for a URL">
                  URL
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarButton
          isIconOnly
          onClick={() => {
            if (theme === 'dark') {
              setTheme('light')
            } else {
              setTheme('dark')
            }
          }}
          tooltip={{
            title: 'Theme',
            description: 'Toggle the site between light and dark theme',
            key: 'Q',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 24 24"
            width="22"
            fill="currentColor"
          >
            <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM1 9h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.243a1 1 0 0 1 0 1.414L4.343 17.07a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 2.929l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.343A1 1 0 0 1 4.343 2.93zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z"></path>
          </svg>
        </NavbarButton>

        <NavbarLink
          tooltip={{
            title: 'Login',
            description: 'Log in to your programming.dev account.',
            key: 'N',
          }}
          link="/login"
          disabled
        >
          Login
        </NavbarLink>

        <NavbarLink
          tooltip={{
            title: 'Sign Up',
            description: 'Sign up for an account on the site.',
            key: 'M',
          }}
          link="/signup"
          disabled
        >
          Sign Up
        </NavbarLink>
      </NavbarContent>
    </NavBase>
  )
}
