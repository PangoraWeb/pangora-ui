'use client'

import {
  getCommunityIcon,
  getCommunityLink,
  getCommunityLocal,
  getCommunityName,
} from '@/shared/libs/Lemmy/community'
import { getModlog, getModlogEntryTime } from '@/shared/libs/Lemmy/modlog'
import {
  getPersonAvatar,
  getPersonLink,
  getPersonLocal,
  getPersonName,
  getPersonTag,
} from '@/shared/libs/Lemmy/person'
import { mdToHtml } from '@/shared/libs/Markdown'
import { getRelativeTimeText } from '@/shared/libs/Time'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  User,
} from '@nextui-org/react'
import { ModlogActionType } from 'lemmy-js-client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TableBody, TableHeader } from 'react-stately'

interface ModlogEntry {
  time: string
  reason: string
  id: number
  action: string
  content: string
  expandedContent: boolean
  moderator?: {
    name: string
    link: string
    tag: string
    local: boolean
    avatar?: string
    site: {
      disc: string
      color: string
    }
  }
  community: {
    name: string
    link: string
    tag: string
    local: boolean
    icon?: string
  }
  user?: {
    name: string
    link: string
    tag: string
    local: boolean
    avatar?: string
  }
}

type ModlogScope = 'All' | 'Local' | 'Moderated'

export default function Modlog() {
  const [modlog, setModlog] = useState<ModlogEntry[]>([])
  const [nextPage, setNextPage] = useState<number>(1)
  const [nextFetchID, setNextFetchID] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [modlogScope, setModlogScope] = useState<ModlogScope>('Local')
  const [modlogCategory, setModlogCategory] =
    useState<ModlogActionType>('ModRemoveComment')
  const { theme } = useTheme()

  function appendEntries(entries: ModlogEntry[]) {
    setModlog([...modlog, ...entries])
  }

  useEffect(() => {
    console.log(modlogScope)
    setNextFetchID(nextFetchID + 1)
    loadEntries(1, true)
  }, [modlogScope, modlogCategory])

  async function loadEntries(page: number, clear = false) {
    const currentPage = page
    const fetchId = nextFetchID
    setNextPage(currentPage + 1)

    setIsLoading(true)

    const modlog = await getModlog({
      type_: modlogCategory,
      limit: 50,
      page: currentPage,
    })

    //const federatedInstances = await client.getFederatedInstances()

    let localEntries: ModlogEntry[] = []

    if (modlog.removed_comments) {
      const removedComments = modlog.removed_comments.map<ModlogEntry>((e) => {
        {
          const newEntry = {
            time: getModlogEntryTime(e),
            reason: e.mod_remove_comment.reason,
            id: e.mod_remove_comment.id,
            action: `Removed Comment`,
            content: e.comment.content,
          } as ModlogEntry

          if (e.moderator) {
            /*const site = federatedInstances?.federated_instances?.linked.find(
              (instance) => instance.id === e.moderator?.instance_id
            )*/

            newEntry.moderator = {
              name: getPersonName(e.moderator),
              link: getPersonLink(e.moderator),
              tag: getPersonTag(e.moderator),
              avatar: getPersonAvatar(e.moderator),
              local: getPersonLocal(e.moderator),
              site: {
                disc: 'P.D',
                color: '#dadada',
              },
            }
          }

          newEntry.community = {
            name: getCommunityName(e.community),
            link: getCommunityLink(e.community),
            tag: getCommunityLink(e.community),
            icon: getCommunityIcon(e.community),
            local: getCommunityLocal(e.community),
          }

          newEntry.user = {
            name: getPersonName(e.commenter),
            link: getPersonLink(e.commenter),
            tag: getPersonTag(e.commenter),
            avatar: getPersonAvatar(e.commenter),
            local: getPersonLocal(e.commenter),
          }

          return newEntry
        }
      })

      localEntries = [...localEntries, ...removedComments]
    }

    if (modlog.removed_posts) {
      const removedComments = modlog.removed_posts.map<ModlogEntry>((e) => {
        {
          const newEntry = {
            time: getModlogEntryTime(e),
            reason: e.mod_remove_post.reason,
            id: e.mod_remove_post.id,
            action: `Removed Post`,
            content: e.post.name,
          } as ModlogEntry

          if (e.moderator) {
            /*const site = federatedInstances?.federated_instances?.linked.find(
              (instance) => instance.id === e.moderator?.instance_id
            )*/

            newEntry.moderator = {
              name: getPersonName(e.moderator),
              link: getPersonLink(e.moderator),
              tag: getPersonTag(e.moderator),
              avatar: getPersonAvatar(e.moderator),
              local: getPersonLocal(e.moderator),
              site: {
                disc: 'P.D',
                color: '#dadada',
              },
            }
          }

          newEntry.community = {
            name: getCommunityName(e.community),
            link: getCommunityLink(e.community),
            tag: getCommunityLink(e.community),
            icon: getCommunityIcon(e.community),
            local: getCommunityLocal(e.community),
          }

          return newEntry
        }
      })

      localEntries = [...localEntries, ...removedComments]
    }

    if (nextFetchID === fetchId) {
      setIsLoading(false)
      console.log(clear)
      if (clear) {
        setModlog(localEntries)
      } else {
        appendEntries(localEntries)
      }
    }
  }

  function changeSort() {
    /*switch (sortDescriptor.column) {
      case 'mod': {
        setModlog(
          modlog.sort((a, b) => {
            if (a.moderator && !b.moderator) return 1
            if (!a.moderator && b.moderator) return -1
            if (a.moderator && b.moderator) {
              return a.moderator.name > b.moderator.name ? 1 : -1
            }

            return 0
          })
        )
      }
    }*/
  }

  return (
    <div>
      <div className="flex justify-between w-full">
        <ButtonGroup>
          <Dropdown>
            <DropdownTrigger>
              <Button>AAA</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Test</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button onClick={() => setModlogCategory('ModRemoveComment')}>
            Removed Comments
          </Button>
          <Button onClick={() => setModlogCategory('ModRemovePost')}>
            Removed Posts
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            onClick={() => setModlogScope('Local')}
            style={{
              color:
                modlogScope === 'Local'
                  ? 'deepskyblue'
                  : theme == 'dark'
                  ? 'white'
                  : 'black',
            }}
          >
            Local
          </Button>
          <Button
            onClick={() => setModlogScope('All')}
            style={{
              color:
                modlogScope === 'All'
                  ? 'deepskyblue'
                  : theme == 'dark'
                  ? 'white'
                  : 'black',
            }}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
      <Table
        onSortChange={changeSort}
        bottomContent={isLoading ? <Spinner /> : ''}
      >
        <TableHeader>
          <TableColumn key="time" allowsSorting>
            Time
          </TableColumn>
          <TableColumn key="mod" allowsSorting>
            Mod
          </TableColumn>
          <TableColumn>Community</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Action</TableColumn>
          <TableColumn>Reason</TableColumn>
          <TableColumn>Content</TableColumn>
        </TableHeader>
        <TableBody
          items={modlog.filter((e) => {
            if (
              modlogScope === 'Local' &&
              !e.community.local &&
              !e.moderator?.local &&
              !e.user?.local
            )
              return false
            return true
          })}
        >
          {(entry) => (
            <TableRow key={entry.id}>
              <TableCell className="text-xs text-default-300">
                {getRelativeTimeText(entry.time)}
              </TableCell>
              <TableCell>
                <Badge
                  content={entry.moderator?.site.disc}
                  style={{
                    backgroundColor: entry.moderator?.site.color,
                  }}
                  placement="top-left"
                >
                  <Card
                    isBlurred
                    className="w-full max-w-full min-w-full"
                    classNames={{ base: 'w-full max-w-full min-w-full' }}
                  >
                    <User
                      name={entry.moderator?.name}
                      description={entry.moderator?.link}
                      avatarProps={{ src: entry.moderator?.avatar }}
                    />
                  </Card>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  content="Local"
                  style={{
                    visibility: entry.community.local ? 'visible' : 'hidden',
                    backgroundColor: '#31a131',
                  }}
                  placement="top-left"
                >
                  <Card
                    isBlurred
                    className="w-full max-w-full min-w-full"
                    classNames={{ base: 'w-full max-w-full min-w-full' }}
                  >
                    <User
                      name={entry.community.name}
                      description={entry.community.link}
                      avatarProps={{ src: entry.community.icon }}
                    />
                  </Card>
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  content="Local"
                  style={{
                    visibility: entry.user?.local ? 'visible' : 'hidden',
                    backgroundColor: '#31a131',
                  }}
                  placement="top-left"
                >
                  <Card
                    isBlurred
                    className="w-full max-w-full min-w-full"
                    classNames={{ base: 'w-full max-w-full min-w-full' }}
                  >
                    <User
                      name={entry.user?.name}
                      description={entry.user?.link}
                      avatarProps={{ src: entry.user?.avatar }}
                    />
                  </Card>
                </Badge>
              </TableCell>
              <TableCell>
                <div
                  className="prose prose-sm prose-invert"
                  dangerouslySetInnerHTML={mdToHtml(entry.action)}
                />
              </TableCell>
              <TableCell className="text-xs text-default-400">
                {entry.reason}
              </TableCell>
              <TableCell className="text-xs text-default-400">
                {entry.content}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button onClick={() => loadEntries(nextPage)}>Load More</Button>
    </div>
  )
}
