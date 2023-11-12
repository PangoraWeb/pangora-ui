import {
  CreatePostLike,
  GetComments,
  GetPost,
  GetPosts,
  Post,
  PostView,
} from 'lemmy-js-client'
import { client } from '.'
import { getRelativeTimeText } from '../Time'
import { cleanText } from '../Text'

// --- API Functions -----------------------------------------------------------

export async function getPosts(form?: GetPosts) {
  return client.getPosts(form)
}

export async function getPost(form?: GetPost) {
  return client.getPost(form)
}

export async function getComments(form?: GetComments) {
  return client.getComments(form)
}

export async function likePost(form: CreatePostLike) {
  return client.likePost(form)
}

// --- Object Functions --------------------------------------------------------

export function getPostTime(post: PostType) {
  switch (getPostObjectType(post)) {
    case 'PostView': {
      const typed = post as PostView
      return getRelativeTimeText(typed.post.published)
    }
    case 'Post': {
      const typed = post as Post
      return getRelativeTimeText(typed.published)
    }
  }
}

export function getPostLink(post: PostType) {
  switch (getPostObjectType(post)) {
    case 'PostView': {
      const typed = post as PostView
      return typed.post.ap_id
    }
    case 'Post': {
      const typed = post as Post
      return typed.ap_id
    }
  }
}

export function getPostLocal(post: PostType) {
  switch (getPostObjectType(post)) {
    case 'PostView': {
      const typed = post as PostView
      return typed.post.local
    }
    case 'Post': {
      const typed = post as Post
      return typed.local
    }
  }
}

export function getPostId(post: PostType) {
  switch (getPostObjectType(post)) {
    case 'PostView': {
      const typed = post as PostView
      return typed.post.id
    }
    case 'Post': {
      const typed = post as Post
      return typed.id
    }
  }
}

export function getPostURL(post: PostType) {
  switch (getPostObjectType(post)) {
    case 'PostView': {
      const typed = post as PostView
      return typed.post.url
    }
    case 'Post': {
      const typed = post as Post
      return typed.url
    }
  }
}

export function getPostSource(post: PostType) {
  const postURL = getPostURL(post)

  if (!postURL) return undefined

  return postURL.split('/').slice(2, 3).join('/')
}

export function getPostTitle(post: PostType) {
  let content = ''

  switch (getPostObjectType(post)) {
    case 'PostView': {
      const typed = post as PostView
      content = typed.post.name
      break
    }
    case 'Post': {
      const typed = post as Post
      content = typed.name
      break
    }
  }

  content = cleanText(content)

  return content
}

export function getRelativePostLink(post: PostType) {
  const postId = getPostId(post)

  return `/post/${postId}`
}

// --- Helper Functions --------------------------------------------------------

function getPostObjectType(post: PostType) {
  if ((post as PostView).post) {
    return 'PostView'
  } else {
    return 'Post'
  }
}

type PostType = PostView | Post
