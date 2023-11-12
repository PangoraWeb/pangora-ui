import { ListingType, SortType } from 'lemmy-js-client'
import { ReactElement } from 'react'

export interface HomeFeedDropdownItemType {
  key: SortType | ListingType
  name: string
  description: string
  icon: ReactElement
  separateButton?: boolean
  color?: string
  hoverColor?: string
  borderColor?: string
}

export interface HomeFeedDropdownItemTypeSort extends HomeFeedDropdownItemType {
  key: SortType
}

export interface HomeFeedDropdownItemTypeScope
  extends HomeFeedDropdownItemType {
  key: ListingType
}
