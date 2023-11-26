'use client'

import { ButtonGroup } from '@nextui-org/button'
import HomeIcon from '@/icons/HomeIcon'
import CircleIcon from '@/icons/CircleIcon'
import StarIcon from '@/icons/StarIcon'
import HomeFeedDropdownButton from './HomeFeedDropdownButton'
import { HomeFeedDropdownItemTypeScope } from '@/types/HomeFeedDropdownItemType'
import { ListingType, SortType } from 'lemmy-js-client'

const scopes: HomeFeedDropdownItemTypeScope[] = [
  {
    key: 'All',
    name: 'All',
    description: 'Shows you posts in all connected sites in the fediverse.',
    icon: <CircleIcon />,
    color: 'text-emerald-500',
    borderColor: 'border-emerald-500',
    hoverColor: 'group-hover:text-emerald-500',
  },
  {
    key: 'Local',
    name: 'Local',
    description:
      'Shows you posts in the site and posts in recommended communities in connected sites.',
    icon: <HomeIcon />,
    color: 'text-cyan-500',
    borderColor: 'border-cyan-500',
    hoverColor: 'group-hover:text-cyan-500',
  },
  {
    key: 'Subscribed',
    name: 'Subscribed',
    description: "Shows you posts in communities you've subscribed to.",
    icon: <StarIcon />,
    color: 'text-yellow-500',
    borderColor: 'border-yellow-500',
    hoverColor: 'group-hover:text-yellow-500',
  },
]

export default function HomeFeedScopeButtons({
  sortType,
  listingType,
}: {
  sortType: SortType
  listingType: ListingType
}) {
  return (
    <ButtonGroup>
      {scopes
        .map((scope) => {
          return (
            <HomeFeedDropdownButton
              key={scope.key}
              item={scope}
              href={`/?sort=${sortType}&scope=${scope.key}`}
              selected={scope.key === listingType}
            />
          )
        })
        .reverse()}
    </ButtonGroup>
  )
}
