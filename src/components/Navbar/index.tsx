'use client'

import { Navbar as NavBase, NavbarContent } from '@nextui-org/react'
import { GetSiteResponse, MyUserInfo } from 'lemmy-js-client'
import { getSite, getSiteIcon, getSiteName } from '@/shared/libs/Lemmy/site'
import NavbarLink from './NavbarLink'
import NavbarHotkeys from './NavbarHotkeys'
import NavbarBrand from './NavbarBrand'
import NavbarButton from './NavbarButton'
import { useTheme } from 'next-themes'
import { getUser, loggedIn } from '@/shared/libs/Users'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import HeartIcon from '@/icons/HeartIcon'

export default function NavbarNode() {
  const { theme, setTheme } = useTheme()
  const [self, setSelf] = useState<MyUserInfo>()
  const pathname = usePathname()
  const [site, setSite] = useState<GetSiteResponse>()

  useEffect(() => {
    async function fetch() {
      setSite(await getSite())
    }
    fetch()
  }, [])

  useEffect(() => {
    console.log(loggedIn())
    console.log(self)

    if (loggedIn() && !self) {
      fetch()
    }

    async function fetch() {
      setSelf(await getUser())
      console.log(await getUser())
    }
  }, [pathname])

  return (
    <NavBase
      isBordered
      maxWidth="2xl"
      classNames={{
        item: 'flex items-center h-full',
      }}
    >
      <NavbarHotkeys />
      <NavbarBrand
        name={site ? getSiteName(site) : 'Loading...'}
        icon={site ? getSiteIcon(site) : ''}
      />

      {/* -- Items on left side of navbar -- */}
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {/* Community List */}
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

        {/* Create Post */}
        <NavbarLink
          tooltip={{
            title: 'Create Post',
            description: 'Start the creation of a post on the site.',
            key: 'C',
          }}
          link="/create_post"
        >
          Create Post
        </NavbarLink>

        {/* Request Community */}
        <NavbarLink
          tooltip={{
            title: 'Request Community',
            description:
              'Go to our section for community suggestions! Communities will be added if theres anough interest and it fits the site.',
            key: 'V',
          }}
          link="/c/community_request"
        >
          Request Community
        </NavbarLink>

        {/* Donate */}
        <NavbarLink
          tooltip={{
            title: 'Donate',
            description:
              'We are a free open-source site that relies on donations to keep ourselves running.',
            key: 'B',
          }}
          link="/donate"
        >
          <HeartIcon />
        </NavbarLink>
      </NavbarContent>

      {/* -- Items on right side of navbar -- */}
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {/* Theme Switcher */}
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
            description: 'Toggle the site between light and dark themes.',
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
      </NavbarContent>
    </NavBase>
  )
}

/*
        <NavbarSearch />

        <NavbarDropdown
          isIconOnly
          tooltip={{
            title: 'Search Switcher',
            description: 'Switch what to search for in the search bar.',
            key: 'D',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-5 -8 24 24"
            width="24"
            fill="currentColor"
          >
            <path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z"></path>
          </svg>
        </NavbarDropdown>
*/

/*

        <NavbarLink
          tooltip={{
            title: 'Admin Settings',
            description: 'Settings related to administation of the site',
            key: '?',
          }}
          link="/admin"
        >
          <CogIcon />
        </NavbarLink>


        <NavbarLink
          tooltip={{
            title: 'Inbox',
            description: 'See your inbox!',
            key: '?',
          }}
          link="/inbox"
        >
          <BellIcon />
        </NavbarLink>
*/

/*
{self ? (
          <NavbarItem>
            <Dropdown className="bg-black">
              <DropdownTrigger className="text-base">
                <Button
                  variant="bordered"
                  className="text-white rounded-full"
                  isIconOnly
                >
                  <Avatar src={self.local_user_view.person.avatar} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownSection showDivider>
                  <DropdownItem
                    key="profile"
                    onClick={() => {
                      router.push(self.local_user_view.person.actor_id)
                    }}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                  <DropdownItem key="logout">Info</DropdownItem>
                  <DropdownItem key="logout">Terms & Policies</DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-success"
                    color="success"
                    onClick={() => {
                      router.push('/donate')
                    }}
                  >
                    Donate
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    onClick={() => {
                      logout()
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="flex gap-4">
            
            <NavbarLink
              tooltip={{
                title: 'Login',
                description: 'Log in to your programming.dev account.',
                key: 'O',
              }}
              link="/login"
            >
              Login
            </NavbarLink>

            
            <NavbarLink
              tooltip={{
                title: 'Sign Up',
                description: 'Sign up for an account on the site.',
                key: 'P',
              }}
              link="/signup"
            >
              Sign Up
            </NavbarLink>
          </div>
        )}
*/

/*

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

        
      </NavbarContent>
    </NavBase>
  )
*/
