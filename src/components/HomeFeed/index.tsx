'use server'

import { ListingType, SortType } from 'lemmy-js-client'
import { getPosts } from '@/shared/libs/Lemmy/post'
import HomeFeedNode from './HomeFeedNode'

export default async function HomeFeed({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sortType = ((searchParams ? searchParams['sort'] : null) ??
    'Active') as SortType
  const listingType = ((searchParams ? searchParams['scope'] : null) ??
    'Local') as ListingType

  const postsResponse = await getPosts({
    type_: listingType,
    sort: sortType,
    limit: 50,
    page: 1,
  })

  const startingPosts = postsResponse.posts

  return (
    <HomeFeedNode
      startingPosts={startingPosts}
      sortType={sortType}
      listingType={listingType}
    />
  )
}

/*const [posts, setPosts] = useState<PostView[]>([])
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
          sortType={selectedSort}
          selectedScope={selectedScope}
          setSelectedScope={(scope: ListingType) => {
            setSelectedScope(scope)
          }}
        />
        <HomeFeedSortButtons
          listingType={selectedScope}
          selectedSort={selectedSort}
          setSelectedSort={(sort: SortType) => {
            setSelectedSort(sort)
          }}
        />
      </div>
      <PostFeed posts={posts} />
      {isLoading ? <Spinner /> : ''}
    </div>
  )*/
