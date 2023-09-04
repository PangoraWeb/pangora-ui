import {
  CommentView,
  GetComments,
  GetPost,
  GetPosts,
  PostView,
} from 'lemmy-js-client'
import { client } from '.'
import { formatDistance } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

export async function getPosts(form?: GetPosts) {
  return client.getPosts(form)
}

export async function getPost(form?: GetPost) {
  return client.getPost(form)
}

export async function getComments(form?: GetComments) {
  return client.getComments(form)
}

export function getPostTime(post: PostView) {
  return formatDistance(
    new Date(post.counts.published),
    zonedTimeToUtc(Date.now(), 'America/Anchorage'),
    {
      addSuffix: true,
    }
  )
}

export function getCommentTime(comment: CommentView) {
  return formatDistance(
    new Date(comment.counts.published),
    zonedTimeToUtc(Date.now(), 'America/Anchorage'),
    {
      addSuffix: true,
    }
  )
}
