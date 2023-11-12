import {
  GetModlog,
  GetModlogResponse,
  ModRemoveCommentView,
  ModRemovePostView,
} from 'lemmy-js-client'
import { client } from '.'

// --- API Functions -----------------------------------------------------------

export async function getModlog(form?: GetModlog): Promise<GetModlogResponse> {
  return client.getModlog(form)
}

// --- Object Functions --------------------------------------------------------

export function getModlogEntryTime(
  modlogEntry: ModRemoveCommentView | ModRemovePostView
): string {
  switch (getModlogEntryObjectType(modlogEntry)) {
    case 'ModRemoveCommentView': {
      const typedModlogEntry = modlogEntry as ModRemoveCommentView
      return typedModlogEntry.mod_remove_comment.when_
    }
    case 'ModRemovePostView': {
      const typedModlogEntry = modlogEntry as ModRemovePostView
      return typedModlogEntry.mod_remove_post.when_
    }
    default: {
      throw new Error('Invalid modlog entry object type given')
    }
  }
}

// --- Helper Functions --------------------------------------------------------

function getModlogEntryObjectType(
  entry: ModRemoveCommentView | ModRemovePostView
) {
  if ((entry as ModRemoveCommentView).mod_remove_comment) {
    return 'ModRemoveCommentView'
  } else if ((entry as ModRemovePostView).mod_remove_post) {
    return 'ModRemovePostView'
  } else {
    throw new Error('Invalid modlog entry object type given')
  }
}
