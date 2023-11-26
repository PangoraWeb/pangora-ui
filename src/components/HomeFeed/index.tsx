'use client'

import { useEffect, useState } from 'react'
import HomeFeedScopeButtons from './HomeFeedScopeButtons'
import HomeFeedSortButtons from './HomeFeedSortButtons'
import { PostFeed } from '../PostFeed'
import { ListingType, PostView, SortType } from 'lemmy-js-client'
import { getPosts } from '@/shared/libs/Lemmy/post'
import { Spinner } from '@nextui-org/react'

export default function HomeFeed() {
  const [posts, setPosts] = useState<PostView[]>([])
  const [nextPage, setNextPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [selectedScope, setSelectedScope] = useState<ListingType>('Local')
  const [selectedSort, setSelectedSort] = useState<SortType>('Active')
  const [nextFetchID, setNextFetchID] = useState<number>(1)

  function appendPosts(newPosts: PostView[]) {
    setPosts(posts.concat(newPosts))
  }

  useEffect(() => {
    //setUser((await getPersonDetails()).person_view.person)
  }, [])

  useEffect(() => {
    setNextFetchID(nextFetchID + 1)
    loadEntries(1, true)
  }, [selectedScope, selectedSort])

  useEffect(() => {
    if (atBottom) {
      loadEntries(nextPage, false)
    }
  }, [atBottom])

  async function loadEntries(page: number, clear = false) {
    const currentPage = page
    const fetchId = nextFetchID
    setNextPage(currentPage + 1)

    const newEntries = await getPosts({
      type_: selectedScope,
      sort: selectedSort,
      limit: 50,
      page: currentPage,
    })

    if (nextFetchID === fetchId) {
      setIsLoading(false)
      if (clear) {
        setPosts(newEntries.posts)
      } else {
        appendPosts(newEntries.posts)
      }
      setAtBottom(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!atBottom) {
          setAtBottom(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <div className="flex justify-between">
        <HomeFeedScopeButtons
          selectedScope={selectedScope}
          setSelectedScope={(scope: ListingType) => {
            setSelectedScope(scope)
          }}
        />
        <HomeFeedSortButtons
          selectedSort={selectedSort}
          setSelectedSort={(sort: SortType) => {
            setSelectedSort(sort)
          }}
        />
      </div>
      <PostFeed posts={posts} />
      {isLoading ? <Spinner /> : ''}
    </div>
  )
}
