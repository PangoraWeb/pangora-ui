'use client'

import ChevronDownIcon from '@/icons/ChevronDownIcon'
import ClockIcon from '@/icons/ClockIcon'
import FireIcon from '@/icons/FireIcon'
import MessageWritingIcon from '@/icons/MessageWritingIcon'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { useState } from 'react'
import HomeFeedDropdownButton from './HomeFeedDropdownButton'
import { HomeFeedDropdownItemTypeSort } from '@/types/HomeFeedDropdownItemType'
import HourglassIcon from '@/icons/HourglassIcon'
import SparklesIcon from '@/icons/SparklesIcon'
import { ListingType, SortType } from 'lemmy-js-client'
import { usePathname, useRouter } from 'next/navigation'

const sorts: HomeFeedDropdownItemTypeSort[] = [
  {
    key: 'Hot',
    name: 'Hot',
    description: '',
    icon: <FireIcon />,
    separateButton: true,
    color: 'text-red-500',
    borderColor: 'border-red-500',
    hoverColor: 'group-hover:text-red-500',
  },
  {
    key: 'Active',
    name: 'Active',
    description: '',
    icon: <MessageWritingIcon />,
    separateButton: true,
    hoverColor: 'group-hover:text-green-500',
    borderColor: 'border-green-500',
    color: 'text-green-500',
  },
  {
    key: 'New',
    name: 'New',
    description: 'Shows the newest posts first',
    icon: <SparklesIcon />,
    hoverColor: 'group-hover:text-yellow-500',
    borderColor: 'border-yellow-500',
    color: 'text-yellow-500',
  },
  {
    key: 'Old',
    name: 'Old',
    description: 'Shows the oldest posts first',
    icon: <HourglassIcon />,
    hoverColor: 'group-hover:text-amber-500',
    borderColor: 'border-amber-500',
    color: 'text-amber-500',
  },
  {
    key: 'MostComments',
    name: 'Most Comments',
    description: 'Shows posts with the most comments first',
    icon: <ClockIcon />,
    hoverColor: 'group-hover:text-emerald-500',
    borderColor: 'border-emerald-500',
    color: 'text-emerald-500',
  },
  {
    key: 'NewComments',
    name: 'New Comments',
    description: 'Shows posts with the newest comments first',
    icon: <ClockIcon />,
    hoverColor: 'group-hover:text-teal-500',
    borderColor: 'border-teal-500',
    color: 'text-teal-500',
  },
  {
    key: 'TopHour',
    name: 'Top Hour',
    description: 'Shows top posts from the last hour',
    icon: <ClockIcon />,
  },
  {
    key: 'TopSixHour',
    name: 'Top Six Hours',
    description: 'Shows top posts from the last six hours',
    icon: <ClockIcon />,
  },
  {
    key: 'TopTwelveHour',
    name: 'Top Twelve Hours',
    description: 'Shows top posts from the last twelve hours',
    icon: <ClockIcon />,
  },
  {
    key: 'TopDay',
    name: 'Top Day',
    description: 'Shows top posts from the last day',
    icon: <ClockIcon />,
  },
  {
    key: 'TopWeek',
    name: 'Top Week',
    description: 'Shows top posts from the last week',
    icon: <ClockIcon />,
  },
  {
    key: 'TopMonth',
    name: 'Top Month',
    description: 'Shows top posts from the last month',
    icon: <ClockIcon />,
  },
  {
    key: 'TopThreeMonths',
    name: 'Top Three Months',
    description: 'Shows top posts from the last three months',
    icon: <ClockIcon />,
  },
  {
    key: 'TopSixMonths',
    name: 'Top Six Months',
    description: 'Shows top posts from the last six months',
    icon: <ClockIcon />,
  },
  {
    key: 'TopNineMonths',
    name: 'Top Nine Months',
    description: 'Shows top posts from the last nine months',
    icon: <ClockIcon />,
  },
  {
    key: 'TopYear',
    name: 'Top Year',
    description: 'Shows top posts from the last year',
    icon: <ClockIcon />,
  },
  {
    key: 'TopAll',
    name: 'Top All',
    description: 'Shows top posts from all time',
    icon: <ClockIcon />,
  },
]

export default function HomeFeedSortButtons({
  listingType,
  sortType,
}: {
  listingType?: ListingType
  sortType?: SortType
}) {
  const [dropdownSort, setDropdownSort] =
    useState<HomeFeedDropdownItemTypeSort>(
      sorts.filter((sort) => !sort.separateButton)[0]
    )
  const router = useRouter()
  const pathname = usePathname()

  return (
    <ButtonGroup>
      {sorts
        .filter((sort) => sort.separateButton)
        .map((sort) => {
          return (
            <HomeFeedDropdownButton
              key={sort.key}
              item={sort}
              href={`${pathname}?sort=${sort.key}${
                listingType ? `&scope=${listingType}` : ''
              }`}
              selected={sort.key === sortType}
            />
          )
        })}
      <HomeFeedDropdownButton
        item={dropdownSort}
        href={`${pathname}?sort=${dropdownSort.key}${
          listingType ? `&scope=${listingType}` : ''
        }`}
        selected={dropdownSort.key === sortType}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly className="text-default-300">
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            const sort = sorts.find((sort) => sort.key === key.toString())
            if (sort) {
              setDropdownSort(sort)
              //setSelectedSort(sort.key)
              router.push(
                `${pathname}?sort=${sort.key}${
                  listingType ? `&scope=${listingType}` : ''
                }`
              )
            }
          }}
        >
          <DropdownSection title="Default Sorts">
            {sorts
              .filter((sort) => !sort.separateButton)
              .filter((sort) => sort.name !== dropdownSort.name)
              .map((sort) => {
                return (
                  <DropdownItem
                    key={sort.key}
                    startContent={sort.icon}
                    description={sort.description}
                  >
                    {sort.name}
                  </DropdownItem>
                )
              })}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
