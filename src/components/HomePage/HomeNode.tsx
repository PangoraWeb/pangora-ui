'use client'

import { PostView } from 'lemmy-js-client'
import { useState, useRef } from 'react'
import { PostsFeed } from '../PostsFeed'
import { Button, ButtonGroup } from '@nextui-org/react'
import NavbarTooltip from '../Navbar/NavbarTooltip'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTheme } from 'next-themes'

export default function HomeNode({
  localPosts,
  allPosts,
}: {
  localPosts: PostView[]
  allPosts: PostView[]
}) {
  const [scope, setScope] = useState('Local')

  const localButton = useRef<HTMLButtonElement>()
  const allButton = useRef<HTMLButtonElement>()

  // Hotkeys
  useHotkeys('e', () => {
    localButton.current?.click()
  })
  useHotkeys('r', () => {
    allButton.current?.click()
  })

  const { theme } = useTheme()

  return (
    <div>
      <div className="flex justify-between mb-4 mt-3">
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
        <ButtonGroup>
          <Button
            isDisabled
            className="data-[disabled=true]:opacity-20 bg-opacity-20"
          >
            Active
          </Button>
          <Button
            isDisabled
            className="data-[disabled=true]:opacity-20 bg-opacity-20"
          >
            Hot
          </Button>
          <Button
            isDisabled
            className="data-[disabled=true]:opacity-20 bg-opacity-20"
          >
            Top
          </Button>
          <Button
            isDisabled
            className="data-[disabled=true]:opacity-20 bg-opacity-20"
          >
            New
          </Button>
        </ButtonGroup>
      </div>
      {(() => {
        switch (scope) {
          case 'Local': {
            return <PostsFeed posts={localPosts} />
          }
          default:
            return <PostsFeed posts={allPosts} />
        }
      })()}
    </div>
  )
}
