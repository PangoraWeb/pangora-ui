'use client'

import { useEffect, useState } from 'react'
import HomeFeedScopeButtons from './HomeFeedScopeButtons'
import HomeFeedSortButtons from './HomeFeedSortButtons'
import { PostFeed } from '../PostFeed'
import { ListingType, PostView, SortType } from 'lemmy-js-client'
import { getPosts } from '@/shared/libs/Lemmy/post'
import { Spinner } from '@nextui-org/react'

export default function HomeFeedNode({
  startingPosts,
  sortType,
  listingType,
}: {
  startingPosts: PostView[]
  sortType: SortType
  listingType: ListingType
}) {
  const [posts, setPosts] = useState<PostView[]>(startingPosts)
  const [nextPage, setNextPage] = useState<number>(2)
  const [isLoading, setIsLoading] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  function appendPosts(newPosts: PostView[]) {
    setPosts(posts.concat(newPosts))
  }

  useEffect(() => {
    if (atBottom) {
      loadEntries(nextPage)
    }
  }, [atBottom])

  useEffect(() => {
    setPosts(startingPosts)
    setNextPage(2)
  }, [startingPosts])

  async function loadEntries(page: number) {
    const currentPage = page
    setNextPage(currentPage + 1)

    const newEntries = await getPosts({
      type_: listingType,
      sort: sortType,
      limit: 50,
      page: currentPage,
    })

    setIsLoading(false)
    appendPosts(newEntries.posts)
    setAtBottom(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!atBottom) {
          setIsLoading(true)
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
        <HomeFeedScopeButtons sortType={sortType} listingType={listingType} />
        <HomeFeedSortButtons listingType={listingType} sortType={sortType} />
      </div>
      <PostFeed posts={posts} />
      <div className="w-full flex justify-center">
        {isLoading ? <Spinner className="-top-16" size="lg" /> : ''}
      </div>
    </div>
  )
}
