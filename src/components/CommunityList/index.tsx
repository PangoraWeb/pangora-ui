import { getCommunities } from '@/shared/libs/Lemmy/community'
import CommunityListNode from './CommunityListNode'
import { getSite, getSiteCommunityAmount } from '@/shared/libs/Lemmy/site'
import { GetSiteResponse, ListCommunities } from 'lemmy-js-client'

export default async function CommunityList() {
  const site = await getSite()

  const [
    hotLocalCommunities,
    topLocalCommunities,
    topDayLocalCommunities,
    hotAllCommunities,
    topAllCommunities,
    topDayAllCommunities,
  ] = await Promise.all([
    buildCommunitiesRank(
      {
        type_: 'Local',
        sort: 'Hot',
      },
      site,
      10,
      50,
      2
    ),
    buildCommunitiesRank(
      {
        type_: 'Local',
        sort: 'TopAll',
      },
      site,
      20,
      50,
      2
    ),
    buildCommunitiesRank(
      {
        type_: 'Local',
        sort: 'TopDay',
      },
      site,
      40,
      5,
      1
    ),
    buildCommunitiesRank(
      {
        type_: 'All',
        sort: 'Hot',
      },
      site,
      10,
      0,
      0
    ),
    buildCommunitiesRank(
      {
        type_: 'All',
        sort: 'TopAll',
      },
      site,
      20,
      0,
      0
    ),
    buildCommunitiesRank(
      {
        type_: 'All',
        sort: 'TopDay',
      },
      site,
      40,
      20,
      1
    ),
  ])

  return (
    <CommunityListNode
      site={site}
      hotLocalCommunities={hotLocalCommunities}
      topLocalCommunities={topLocalCommunities}
      topDayLocalCommunities={topDayLocalCommunities}
      hotAllCommunities={hotAllCommunities}
      topAllCommunities={topAllCommunities}
      topDayAllCommunities={topDayAllCommunities}
    />
  )
}

async function buildCommunitiesRank(
  form: ListCommunities,
  site: GetSiteResponse,
  everyx: number,
  limitPerPage: number = 50,
  maxPages: number = 9999
) {
  let page = 1

  const calls = []

  if (maxPages === 0 || limitPerPage === 0) return []

  do {
    if (form.type_ === 'Local') {
      if (
        Math.floor(getSiteCommunityAmount(site) / everyx) -
          limitPerPage * (page - 1) ===
        0
      )
        break

      calls.push(
        getCommunities({
          ...form,
          page: page,
          limit:
            getSiteCommunityAmount(site) / everyx - limitPerPage * (page - 1) <
            limitPerPage
              ? Math.floor(getSiteCommunityAmount(site) / everyx) -
                limitPerPage * (page - 1)
              : limitPerPage,
        })
      )
    } else {
      calls.push(
        getCommunities({
          ...form,
          page: page,
          limit: limitPerPage,
        })
      )
    }

    page += 1
  } while (
    getSiteCommunityAmount(site) / everyx > (page - 1) * limitPerPage &&
    page <= maxPages
  )

  const results = await Promise.all(calls)
  const communities = results.flatMap((result) => result.communities)

  return communities
}

/*communities = [
      ...communities,
      ...(
        await getCommunities({
          ...form,
          page: page,
          limit:
            getSiteCommunityAmount(site) / 20 - 50 * (page - 1) < 50
              ? Math.floor(getSiteCommunityAmount(site) / 20) - 50 * (page - 1)
              : 50,
        })
      ).communities, ]*/
