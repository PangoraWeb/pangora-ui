'use client'

import {
  getCommunityCommentAmount,
  getCommunityDescription,
  getCommunityHidden,
  getCommunityIcon,
  getCommunityId,
  getCommunityInstance,
  getCommunityName,
  getCommunityNew,
  getCommunityOuterNew,
  getCommunityPostAmount,
  getCommunitySubscribers,
  getCommunityUsersDay,
  getCommunityUsersHalfYear,
  getCommunityUsersMonth,
  getCommunityUsersWeek,
  getRelativeCommunityLink,
  isCommunityIn,
} from '@/shared/libs/Lemmy/community'
import {
  compactNumber,
  getColorBasedOnMax,
  getMaximum,
} from '@/shared/libs/Number'
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { CommunityView, GetSiteResponse } from 'lemmy-js-client'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAsyncList } from 'react-stately'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { baseUrl } from '@/shared/libs/Lemmy'
import { useTheme } from 'next-themes'
import NavbarTooltip from '../Navbar/NavbarTooltip'
import { useHotkeys } from 'react-hotkeys-hook'

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'subscribers',
  'usersmonth',
  'posts',
  'comments',
  'subscribe',
]
const COLUMNS = [
  {
    slug: 'name',
    name: 'Name + Short',
    description: 'The name and a short description of the community',
  },
  {
    slug: 'subscribers',
    name: 'Subscribers',
    description: 'The amount of people who have subscribed to the community',
  },
  {
    slug: 'usersday',
    name: 'Users / Day',
    description:
      'The amount of users that have interacted in the community in the last day',
  },
  {
    slug: 'usersweek',
    name: 'Users / Week',
    description:
      'The amount of users that have interacted in the community in the last week',
  },
  {
    slug: 'usersmonth',
    name: 'Users / Month',
    description:
      'The amount of users that have interacted in the community in the last month',
  },
  {
    slug: 'usershalfyear',
    name: 'Users / Half Year',
    description:
      'The amount of users that have interacted in the community in the last half year',
  },
  {
    slug: 'posts',
    name: 'Posts',
    description: 'The amount of posts that have been made in the community',
  },
  {
    slug: 'comments',
    name: 'Comments',
    description:
      'The amount of comments that have been made on posts in the community',
  },
  {
    slug: 'hidden',
    name: 'Hidden',
    description:
      'Whether the community is hidden from showing up in the all feed or not',
  },
  {
    slug: 'subscribe',
    name: '',
    description:
      'Show a button that allows you to subscribe or unsubscribe from the community',
  },
]

export default function CommunityListNode({
  site,
  hotLocalCommunities,
  topLocalCommunities,
  topDayLocalCommunities,
  hotAllCommunities,
  topAllCommunities,
  topDayAllCommunities,
}: {
  site: GetSiteResponse
  hotLocalCommunities: CommunityView[]
  topLocalCommunities: CommunityView[]
  topDayLocalCommunities: CommunityView[]
  hotAllCommunities: CommunityView[]
  topAllCommunities: CommunityView[]
  topDayAllCommunities: CommunityView[]
}) {
  const localButton = useRef<HTMLButtonElement>()
  const allButton = useRef<HTMLButtonElement>()

  // Hotkeys
  const router = useRouter()
  useHotkeys('e', () => {
    localButton.current?.click()
  })
  useHotkeys('r', () => {
    allButton.current?.click()
  })

  const [hasMore, setHasMore] = useState(false)
  const [allHasMore, setAllHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [allPage, setAllPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState<Set<string> | string>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [scope, setScope] = useState<string>(
    site.site_view.local_site.default_post_listing_type
  )
  const { theme } = useTheme()

  useEffect(() => {
    console.log(scope)
  }, [scope])

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return COLUMNS

    return COLUMNS.filter((column) =>
      Array.from(visibleColumns).includes(column.slug)
    )
  }, [visibleColumns])

  const list = useAsyncList({
    async load({ signal }) {
      const currentPage = page
      setPage((prev) => prev + 1)

      const limit = 50
      const type = 'Local'
      const sort = 'TopMonth'

      const res = await fetch(
        `${baseUrl}/api/v3/community/list?page=${currentPage}&limit=${limit}&sort=${sort}&type_=${type}`,
        { signal }
      )
      const json = await res.json()

      setHasMore(json.communities.length !== 0)

      const communities = json.communities.filter(
        (community: CommunityView) =>
          (list.items as CommunityView[]).findIndex(
            (c) => c.community.id === community.community.id
          ) === -1
      )

      return {
        items: communities,
        cursor: 'A', // Cursor needs a value
      }
    },
  })

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  })

  const allList = useAsyncList({
    async load({ signal }) {
      const currentPage = allPage
      setAllPage((prev) => prev + 1)

      const limit = 50
      const type = 'All'
      const sort = 'TopMonth'

      const res = await fetch(
        `${baseUrl}/api/v3/community/list?page=${currentPage}&limit=${limit}&sort=${sort}&type_=${type}`,
        { signal }
      )
      const json = await res.json()

      setAllHasMore(json.communities.length !== 0)

      const communities = json.communities.filter(
        (community: CommunityView) =>
          (allList.items as CommunityView[]).findIndex(
            (c) => c.community.id === community.community.id
          ) === -1
      )

      return {
        items: communities,
        cursor: 'A', // Cursor needs a value
      }
    },
  })

  const [allLoaderRef, allScrollerRef] = useInfiniteScroll({
    hasMore: allHasMore,
    onLoadMore: allList.loadMore,
  })

  return (
    <div className="my-4">
      <div className="flex justify-between mb-4">
        <ButtonGroup>
          <Button
            isDisabled
            className="data-[disabled=true]:opacity-20 bg-opacity-20"
          >
            Subscribed
          </Button>

          <NavbarTooltip
            tooltip={{
              title: 'Local',
              description: 'Show all communities made in the site',
              key: 'E',
            }}
          >
            <Button
              className="data-[disabled=true]:opacity-20 bg-opacity-20"
              onClick={() => {
                setScope('Local')
              }}
              style={{
                color:
                  scope == 'Local'
                    ? 'deepskyblue'
                    : theme == 'dark'
                    ? 'white'
                    : 'black',
              }}
              ref={(button) =>
                (localButton.current = button as HTMLButtonElement)
              }
            >
              Local
            </Button>
          </NavbarTooltip>
          <NavbarTooltip
            tooltip={{
              title: 'All',
              description:
                'Show all communities made in all connected sites (excluding hidden)',
              key: 'R',
            }}
          >
            <Button
              className="data-[disabled=true]:opacity-20 bg-opacity-20"
              onClick={() => {
                setScope('All')
              }}
              style={{
                color:
                  scope == 'All'
                    ? 'deepskyblue'
                    : theme == 'dark'
                    ? 'white'
                    : 'black',
              }}
              ref={(button) =>
                (allButton.current = button as HTMLButtonElement)
              }
            >
              All
            </Button>
          </NavbarTooltip>
        </ButtonGroup>

        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button endContent={'Down arrow'} variant="flat">
              Columns
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={(selection) => {
              setVisibleColumns(selection.toString())
            }}
          >
            {COLUMNS.map((column) => (
              <DropdownItem key={column.slug} description={column.description}>
                {column.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        className="overflow-hidden"
        style={{ visibility: scope !== 'Local' ? 'hidden' : 'visible' }}
      >
        <Table
          classNames={{
            base: 'max-h-[82vh] overflow-scroll fixed md:max-w-[748px] lg:max-w-[1004px] xl:max-w-[1260px] 2xl:max-w-[1516px]',
            table: 'min-h-[400px]',
            wrapper: 'bg-opacity-10',
            th: 'bg-opacity-0',
          }}
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          aria-label="Community List Table"
          baseRef={scrollerRef}
          bottomContent={
            hasMore ? (
              <div className="flex w-full justify-center">
                <Spinner ref={loaderRef} color="white" />
              </div>
            ) : null
          }
          onRowAction={(key) => {
            const foundCommunity = list.items.find(
              (community) => getCommunityId(community as CommunityView) == key
            ) as CommunityView

            if (foundCommunity) {
              router.push(getRelativeCommunityLink(foundCommunity))
            }
          }}
          selectionBehavior="toggle"
          selectionMode="single"
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.slug}
                align={column.name === 'actions' ? 'center' : 'start'}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={list.items as CommunityView[]}>
            {(community) => (
              <TableRow key={community.community.id} className="cursor-pointer">
                {(columnKey) => (
                  <TableCell>
                    {(() => {
                      switch (columnKey) {
                        case 'name': {
                          return (
                            <div className="flex">
                              <Badge
                                content={
                                  <div>
                                    {(() => {
                                      if (getCommunityNew(community)) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-2 -2 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M10 16.207l-6.173 3.246 1.179-6.874L.01 7.71l6.902-1.003L10 .453l3.087 6.254 6.902 1.003-4.995 4.869 1.18 6.874z"></path>
                                            </svg>
                                            <p>New</p>
                                          </div>
                                        )
                                      } else if (
                                        getCommunityOuterNew(community)
                                      ) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-2 -2.5 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M10 15.814L3.827 19.06l1.179-6.875L.01 7.317l6.902-1.003L10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814zm0-2.26l3.517 1.85-.672-3.917 2.846-2.774-3.932-.571L10 4.579 8.241 8.142l-3.932.571 2.846 2.774-.672 3.916L10 13.554zM10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814V.06z"></path>
                                            </svg>
                                            <p>New</p>
                                          </div>
                                        )
                                      } else if (
                                        isCommunityIn(
                                          community,
                                          topDayLocalCommunities
                                        )
                                      ) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-2 -2.5 24 24"
                                              width="12"
                                              fill="currentColor"
                                            >
                                              <path d="M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003l-4.347 2.979zM16 10.017a7.136 7.136 0 0 0 0 .369v-.37c.005-.107.006-1.447.004-4.019a3 3 0 0 0-3-2.997H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743v-3.726z"></path>
                                            </svg>
                                            <p>Active</p>
                                          </div>
                                        )
                                      } else if (
                                        isCommunityIn(
                                          community,
                                          hotLocalCommunities
                                        )
                                      ) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-5 -4.5 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"></path>
                                            </svg>
                                            <p>Hot</p>
                                          </div>
                                        )
                                      } else {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-4 -1 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M4 17.502c.307.2.699.26 1.067.133l2.536-.864a1.23 1.23 0 0 1 .794 0l2.536.864c.368.126.76.067 1.067-.133v3.894l-4-1.358-4 1.358v-3.894zm3.677-2.37l-2.062.703a1 1 0 0 1-1.222-.51L3.388 13.26a1 1 0 0 0-.43-.447l-2-1.06a1 1 0 0 1-.485-1.181l.71-2.273a1 1 0 0 0 0-.596l-.71-2.273a1 1 0 0 1 .486-1.182l1.999-1.06a1 1 0 0 0 .43-.446L4.393.674A1 1 0 0 1 5.615.165l2.062.703a1 1 0 0 0 .646 0l2.062-.703a1 1 0 0 1 1.222.51l1.005 2.066a1 1 0 0 0 .43.447l2 1.06a1 1 0 0 1 .485 1.181l-.71 2.273a1 1 0 0 0 0 .596l.71 2.273a1 1 0 0 1-.486 1.182l-1.999 1.06a1 1 0 0 0-.43.446l-1.005 2.067a1 1 0 0 1-1.222.509l-2.062-.703a1 1 0 0 0-.646 0zM8 5a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1z"></path>
                                            </svg>
                                            <p>Top</p>
                                          </div>
                                        )
                                      }
                                    })()}
                                  </div>
                                }
                                color={(() => {
                                  if (getCommunityNew(community)) {
                                    return 'warning'
                                  } else if (getCommunityOuterNew(community)) {
                                    return 'secondary'
                                  } else if (
                                    isCommunityIn(
                                      community,
                                      topDayLocalCommunities
                                    )
                                  ) {
                                    return 'default'
                                  } else if (
                                    isCommunityIn(
                                      community,
                                      hotLocalCommunities
                                    )
                                  ) {
                                    return 'danger'
                                  } else {
                                    return 'success'
                                  }
                                })()}
                                size="sm"
                                placement="top-right"
                                className="mr-4"
                                style={{
                                  color: isCommunityIn(
                                    community,
                                    topDayLocalCommunities
                                  )
                                    ? undefined
                                    : 'black',
                                  backgroundColor:
                                    getCommunityOuterNew(community) &&
                                    !getCommunityNew(community)
                                      ? 'peru'
                                      : undefined,
                                }}
                                isInvisible={
                                  !getCommunityNew(community) &&
                                  !getCommunityOuterNew(community) &&
                                  !isCommunityIn(
                                    community,
                                    hotLocalCommunities
                                  ) &&
                                  !isCommunityIn(
                                    community,
                                    topLocalCommunities
                                  ) &&
                                  !isCommunityIn(
                                    community,
                                    topDayLocalCommunities
                                  )
                                }
                              >
                                <Avatar src={getCommunityIcon(community)} />
                              </Badge>
                              <div className="flex flex-col ml-4">
                                <p className="text-default-800">
                                  {getCommunityName(community)}
                                </p>
                                <p className="text-default-500">
                                  {getCommunityDescription(community).slice(
                                    0,
                                    100
                                  )}
                                  {getCommunityDescription(community).length >
                                    100 && '...'}
                                </p>
                              </div>
                            </div>
                          )
                        }
                        case 'subscribers': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunitySubscribers(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunitySubscribers(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(
                                getCommunitySubscribers(community)
                              )}
                            </div>
                          )
                        }
                        case 'usersday': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersDay(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunityUsersDay(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityUsersDay(community))}
                            </div>
                          )
                        }
                        case 'usershalfyear': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersHalfYear(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunityUsersHalfYear(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(
                                getCommunityUsersHalfYear(community)
                              )}
                            </div>
                          )
                        }
                        case 'usersweek': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersWeek(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunityUsersWeek(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityUsersWeek(community))}
                            </div>
                          )
                        }
                        case 'usersmonth': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersMonth(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunityUsersMonth(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityUsersMonth(community))}
                            </div>
                          )
                        }
                        case 'posts': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityPostAmount(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunityPostAmount(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityPostAmount(community))}
                            </div>
                          )
                        }
                        case 'comments': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityCommentAmount(community),
                                  getMaximum(
                                    list.items.map((item) =>
                                      getCommunityCommentAmount(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(
                                getCommunityCommentAmount(community)
                              )}
                            </div>
                          )
                        }
                        case 'hidden': {
                          return (
                            <div className="text-default-400">
                              {getCommunityHidden(community) ? 'true' : 'false'}
                            </div>
                          )
                        }
                        case 'subscribe': {
                          return (
                            <Button
                              disabled
                              className="opacity-20 bg-opacity-20"
                            >
                              Subscribe
                            </Button>
                          )
                        }
                      }
                    })()}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div
        className="overflow-hidden"
        style={{ visibility: scope !== 'All' ? 'hidden' : 'visible' }}
      >
        <Table
          classNames={{
            base: 'max-h-[82vh] overflow-scroll fixed md:max-w-[748px] lg:max-w-[1004px] xl:max-w-[1260px] 2xl:max-w-[1516px]',
            table: 'min-h-[400px]',
            wrapper: 'bg-opacity-10',
            th: 'bg-opacity-0',
          }}
          sortDescriptor={allList.sortDescriptor}
          onSortChange={allList.sort}
          aria-label="Community List Table"
          baseRef={allScrollerRef}
          bottomContent={
            allHasMore ? (
              <div className="flex w-full justify-center">
                <Spinner ref={allLoaderRef} color="white" />
              </div>
            ) : null
          }
          onRowAction={(key) => {
            const foundCommunity = allList.items.find(
              (community) => getCommunityId(community as CommunityView) == key
            ) as CommunityView

            if (foundCommunity) {
              router.push(getRelativeCommunityLink(foundCommunity))
            }
          }}
          selectionBehavior="toggle"
          selectionMode="single"
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.slug}
                align={column.name === 'actions' ? 'center' : 'start'}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={allList.items as CommunityView[]}>
            {(community) => (
              <TableRow key={community.community.id} className="cursor-pointer">
                {(columnKey) => (
                  <TableCell>
                    {(() => {
                      switch (columnKey) {
                        case 'name': {
                          return (
                            <div className="flex">
                              <Badge
                                content={
                                  <div>
                                    {(() => {
                                      if (getCommunityNew(community)) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-2 -2 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M10 16.207l-6.173 3.246 1.179-6.874L.01 7.71l6.902-1.003L10 .453l3.087 6.254 6.902 1.003-4.995 4.869 1.18 6.874z"></path>
                                            </svg>
                                            <p>New</p>
                                          </div>
                                        )
                                      } else if (
                                        getCommunityOuterNew(community)
                                      ) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-2 -2.5 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M10 15.814L3.827 19.06l1.179-6.875L.01 7.317l6.902-1.003L10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814zm0-2.26l3.517 1.85-.672-3.917 2.846-2.774-3.932-.571L10 4.579 8.241 8.142l-3.932.571 2.846 2.774-.672 3.916L10 13.554zM10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814V.06z"></path>
                                            </svg>
                                            <p>New</p>
                                          </div>
                                        )
                                      } else if (
                                        isCommunityIn(
                                          community,
                                          topDayAllCommunities
                                        )
                                      ) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-2 -2.5 24 24"
                                              width="12"
                                              fill="currentColor"
                                            >
                                              <path d="M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003l-4.347 2.979zM16 10.017a7.136 7.136 0 0 0 0 .369v-.37c.005-.107.006-1.447.004-4.019a3 3 0 0 0-3-2.997H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743v-3.726z"></path>
                                            </svg>
                                            <p>Active</p>
                                          </div>
                                        )
                                      } else if (
                                        isCommunityIn(
                                          community,
                                          hotAllCommunities
                                        )
                                      ) {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-5 -4.5 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"></path>
                                            </svg>
                                            <p>Hot</p>
                                          </div>
                                        )
                                      } else {
                                        return (
                                          <div className="flex items-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="-4 -1 24 24"
                                              width="14"
                                              fill="currentColor"
                                            >
                                              <path d="M4 17.502c.307.2.699.26 1.067.133l2.536-.864a1.23 1.23 0 0 1 .794 0l2.536.864c.368.126.76.067 1.067-.133v3.894l-4-1.358-4 1.358v-3.894zm3.677-2.37l-2.062.703a1 1 0 0 1-1.222-.51L3.388 13.26a1 1 0 0 0-.43-.447l-2-1.06a1 1 0 0 1-.485-1.181l.71-2.273a1 1 0 0 0 0-.596l-.71-2.273a1 1 0 0 1 .486-1.182l1.999-1.06a1 1 0 0 0 .43-.446L4.393.674A1 1 0 0 1 5.615.165l2.062.703a1 1 0 0 0 .646 0l2.062-.703a1 1 0 0 1 1.222.51l1.005 2.066a1 1 0 0 0 .43.447l2 1.06a1 1 0 0 1 .485 1.181l-.71 2.273a1 1 0 0 0 0 .596l.71 2.273a1 1 0 0 1-.486 1.182l-1.999 1.06a1 1 0 0 0-.43.446l-1.005 2.067a1 1 0 0 1-1.222.509l-2.062-.703a1 1 0 0 0-.646 0zM8 5a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1z"></path>
                                            </svg>
                                            <p>Top</p>
                                          </div>
                                        )
                                      }
                                    })()}
                                  </div>
                                }
                                color={(() => {
                                  if (getCommunityNew(community)) {
                                    return 'warning'
                                  } else if (getCommunityOuterNew(community)) {
                                    return 'secondary'
                                  } else if (
                                    isCommunityIn(
                                      community,
                                      topDayAllCommunities
                                    )
                                  ) {
                                    return 'default'
                                  } else if (
                                    isCommunityIn(community, hotAllCommunities)
                                  ) {
                                    return 'danger'
                                  } else {
                                    return 'success'
                                  }
                                })()}
                                size="sm"
                                placement="top-right"
                                className="mr-4"
                                style={{
                                  color: isCommunityIn(
                                    community,
                                    topDayAllCommunities
                                  )
                                    ? undefined
                                    : 'black',
                                  backgroundColor:
                                    getCommunityOuterNew(community) &&
                                    !getCommunityNew(community)
                                      ? 'peru'
                                      : undefined,
                                }}
                                isInvisible={
                                  !getCommunityNew(community) &&
                                  !getCommunityOuterNew(community) &&
                                  !isCommunityIn(
                                    community,
                                    hotAllCommunities
                                  ) &&
                                  !isCommunityIn(
                                    community,
                                    topAllCommunities
                                  ) &&
                                  !isCommunityIn(
                                    community,
                                    topDayAllCommunities
                                  )
                                }
                              >
                                <Avatar src={getCommunityIcon(community)} />
                              </Badge>
                              <div className="flex flex-col ml-4">
                                <div className="flex items-center">
                                  <p className="text-default-800">
                                    {getCommunityName(community)}
                                  </p>
                                  <p className="text-default-400 ml-4 text-[0.6rem]">
                                    {getCommunityInstance(community)}
                                  </p>
                                </div>
                                <p className="text-default-500">
                                  {getCommunityDescription(community).slice(
                                    0,
                                    100
                                  )}
                                  {getCommunityDescription(community).length >
                                    100 && '...'}
                                </p>
                              </div>
                            </div>
                          )
                        }
                        case 'subscribers': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunitySubscribers(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunitySubscribers(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(
                                getCommunitySubscribers(community)
                              )}
                            </div>
                          )
                        }
                        case 'usersday': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersDay(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunityUsersDay(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityUsersDay(community))}
                            </div>
                          )
                        }
                        case 'usershalfyear': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersHalfYear(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunityUsersHalfYear(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(
                                getCommunityUsersHalfYear(community)
                              )}
                            </div>
                          )
                        }
                        case 'usersweek': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersWeek(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunityUsersWeek(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityUsersWeek(community))}
                            </div>
                          )
                        }
                        case 'usersmonth': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityUsersMonth(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunityUsersMonth(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityUsersMonth(community))}
                            </div>
                          )
                        }
                        case 'posts': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityPostAmount(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunityPostAmount(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(getCommunityPostAmount(community))}
                            </div>
                          )
                        }
                        case 'comments': {
                          return (
                            <div
                              style={{
                                color: `${getColorBasedOnMax(
                                  getCommunityCommentAmount(community),
                                  getMaximum(
                                    allList.items.map((item) =>
                                      getCommunityCommentAmount(
                                        item as CommunityView
                                      )
                                    )
                                  )
                                )}`,
                              }}
                            >
                              {compactNumber(
                                getCommunityCommentAmount(community)
                              )}
                            </div>
                          )
                        }
                        case 'hidden': {
                          return (
                            <div className="text-default-400">
                              {getCommunityHidden(community) ? 'true' : 'false'}
                            </div>
                          )
                        }
                        case 'subscribe': {
                          return (
                            <Button
                              disabled
                              className="opacity-20 bg-opacity-20"
                            >
                              Subscribe
                            </Button>
                          )
                        }
                      }
                    })()}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
