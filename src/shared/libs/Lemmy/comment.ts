import {
  Comment,
  CommentView,
  CreateComment,
  CreateCommentLike,
  CreateCommentReport,
  DeleteComment,
  EditComment,
  SaveComment,
} from 'lemmy-js-client'
import { getRelativeTimeText } from '../Time'
import { cleanText } from '../Text'
import { client } from '.'

// --- API Functions -----------------------------------------------------------

export function saveComment(form: SaveComment) {
  return client.saveComment(form)
}

export function createComment(form: CreateComment) {
  return client.createComment(form)
}

export function editComment(form: EditComment) {
  return client.editComment(form)
}

export function deleteComment(form: DeleteComment) {
  return client.deleteComment(form)
}

export function likeComment(form: CreateCommentLike) {
  return client.likeComment(form)
}

export function reportComment(form: CreateCommentReport) {
  return client.createCommentReport(form)
}

// --- Object Functions --------------------------------------------------------

/**
 * Given an object of one of the different kinds of comment types in the api,
 * get the content of the comment
 * @param comment A type of comment object gotten from the site
 * @returns The comment content
 */
export function getCommentContent(
  comment: CommentType,
  maxLength?: number
): string {
  let content = ''

  switch (getCommentObjectType(comment)) {
    case 'CommentView': {
      const typedComment = comment as CommentView
      content = typedComment.comment.content
      break
    }
    case 'Comment': {
      const typedComment = comment as Comment
      content = typedComment.content
      break
    }
  }

  content = cleanText(content)

  if (maxLength && content.length > maxLength) {
    return content.slice(0, maxLength) + '...'
  }

  return content
}

/**
 * Given an object of one of the different kinds of comment types in the api,
 * get the time since the comment was made
 * @param comment A type of comment object gotten from the site
 * @returns The time since the comment was posted
 */
export function getCommentTime(comment: CommentType): string {
  switch (getCommentObjectType(comment)) {
    case 'CommentView': {
      const typedComment = comment as CommentView
      return getRelativeTimeText(typedComment.comment.published)
    }
    case 'Comment': {
      const typedComment = comment as Comment
      return getRelativeTimeText(typedComment.published)
    }
  }
}

/**
 * Given an object of one of the different kinds of comment types in the api,
 * get whether the comment has been deleted
 * @param comment A type of comment object gotten from the site
 * @returns The time since the comment was posted
 */
export function getCommentDeleted(comment: CommentType): boolean {
  switch (getCommentObjectType(comment)) {
    case 'CommentView': {
      const typedComment = comment as CommentView
      return typedComment.comment.deleted
    }
    case 'Comment': {
      const typedComment = comment as Comment
      return typedComment.deleted
    }
  }
}

/**
 * Given an object of one of the different kinds of comment types in the api,
 * get whether the comment has been deleted
 * @param comment A type of comment object gotten from the site
 * @returns The time since the comment was removed
 */
export function getCommentRemoved(comment: CommentType): boolean {
  switch (getCommentObjectType(comment)) {
    case 'CommentView': {
      const typedComment = comment as CommentView
      return typedComment.comment.removed
    }
    case 'Comment': {
      const typedComment = comment as Comment
      return typedComment.removed
    }
  }
}

// --- Helper Functions --------------------------------------------------------

function getCommentObjectType(person: CommentType) {
  if ((person as CommentView).comment) {
    return 'CommentView'
  } else {
    return 'Comment'
  }
}

type CommentType = CommentView | Comment
