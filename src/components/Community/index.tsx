import { getCommunity } from '@/shared/libs/Lemmy/community'
import CommunityNode from './CommunityNode'
import { getPosts } from '@/shared/libs/Lemmy/post'
import { GetCommunityResponse, SortType } from 'lemmy-js-client'
import { baseName } from '@/shared/libs/Lemmy'

const mainDomains = [
  'lemmy.ml',
  'lemmy.world',
  'beehaw.org',
  'lemmy.zip',
  'mander.xyz',
  'lemm.ee',
  'hexbear.net',
  'sh.itjust.works',
  'feddit.de',
  'lemmy.ca',
  'lemmy.dbzer0.com',
  'lemmy.blahaj.zone',
  'discuss.tchncs.de',
  'lemmy.zip',
  'lemmy.sdf.org',
  'lemmy.one',
]

export default async function Community({
  slug,
  searchParams,
}: {
  slug: string
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sortType = ((searchParams ? searchParams['sort'] : null) ??
    'Active') as SortType

  const fixedSlug = decodeURIComponent(slug)
  const splitSlugs = fixedSlug.split('+')

  //const federatedInstances = await getFederatedSites()
  /*const instancesToCheck = [
    baseName,
    ...(federatedInstances.federated_instances?.linked.map(
      (instance) => instance.domain
    ) || []),
  ]*/
  const instancesToCheck = [baseName, ...mainDomains]
  //const communities: GetCommunityResponse[] = []
  const communityCalls: Promise<GetCommunityResponse | undefined>[] = []

  for (const slug of splitSlugs) {
    const splitRules = slug.split('-')
    const splitSlug = splitRules[0].split('@')

    let instances = instancesToCheck

    if (splitRules.length > 1) {
      for (const rule of splitRules) {
        if (rule.startsWith('!') && rule.length > 1) {
          instances = instances.filter((instance) => instance !== rule.slice(1))
        }
      }
    }

    if (splitSlug.length === 1) {
      communityCalls.push(getCommunity({ name: splitSlug[0] }))
    } else {
      if (splitSlug[1] === '*') {
        for (const instance of instances) {
          communityCalls.push(
            getCommunity({ name: `${splitSlug[0]}@${instance}` })
          )
        }
      } else {
        communityCalls.push(getCommunity({ name: slug }))
      }
    }
  }

  const communitiesSettled = await Promise.allSettled(communityCalls)
  const communities = communitiesSettled
    .filter((community) => community.status === 'fulfilled')
    .map(
      (community) =>
        community.hasOwnProperty('value') &&
        (community as PromiseFulfilledResult<GetCommunityResponse | undefined>)
          .value
    )
    .filter((community) => community !== undefined) as GetCommunityResponse[]

  /*if (splitSlug.length !== 1 && federatedInstances.federated_instances) {
    for (const instance of federatedInstances.federated_instances.linked) {
      try {
        const fetched = await getCommunity({
          name: `${splitSlug[0]}@${instance.domain}`,
        })
        communities.push(fetched)
      } catch {}
    }
  }*/

  /*const communities = await Promise.all(
    splitSlugs.map((slug) => {
      const splitSlug = slug.split('@')

      if (splitSlug.length === 1) {
        return getCommunity({ name: splitSlug[0] })
      }

      if (splitSlug[1] == '*') {
        for (const instance of federatedInstances.federated_instances?.linked ||
          []) {
          return getCommunity({ name: `${splitSlug[0]}@${instance.domain}` })
        }
      }
    })
  )*/
  const posts = await Promise.all(
    communities.map((community) =>
      getPosts({
        community_id: community.community_view.community.id,
        limit: 50,
        sort: sortType,
      })
    )
  )

  const mergedPosts = posts
    .map((post) => post.posts)
    .flat()
    .sort((a, b) => {
      if (sortType === 'New') {
        const asplit = a.counts.published.split('T')
        const bsplit = b.counts.published.split('T')

        if (asplit[0] !== bsplit[0]) {
          return asplit[0] < bsplit[0] ? 1 : -1
        }

        if (asplit[1] !== bsplit[1]) {
          return asplit[1] < bsplit[1] ? 1 : -1
        }

        return 0
      } else if (
        sortType === 'TopDay' ||
        sortType === 'TopWeek' ||
        sortType === 'TopMonth' ||
        sortType === 'TopYear' ||
        sortType === 'TopAll' ||
        sortType === 'TopThreeMonths' ||
        sortType === 'TopSixMonths' ||
        sortType === 'TopNineMonths' ||
        sortType === 'TopHour' ||
        sortType === 'TopSixHour' ||
        sortType === 'TopTwelveHour'
      ) {
        if (a.counts.score === b.counts.score) return 0
        return a.counts.score < b.counts.score ? 1 : -1
      } else {
        return 1
      }
    })

  return (
    <CommunityNode
      communities={communities}
      posts={mergedPosts}
      sortType={sortType}
    ></CommunityNode>
  )
}
