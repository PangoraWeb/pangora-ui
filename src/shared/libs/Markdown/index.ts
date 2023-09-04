import MarkdownIt from 'markdown-it'

import { sanitize } from 'isomorphic-dompurify'
import markdownItContainer from 'markdown-it-container'
import markdownItSup from 'markdown-it-sup'
import markdownItSub from 'markdown-it-sub'
import markdownItRuby from 'markdown-it-ruby'
import markdownItHighlightJS from 'markdown-it-highlightjs'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItTexmath from 'markdown-it-texmath'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHtml5Embed from 'markdown-it-html5-embed'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'

const spoilerConfig = {
  validate: (params: string) => {
    return params.trim().match(/^spoiler\s+(.*)$/)
  },

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  render: (tokens: any, idx: any) => {
    const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)

    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<details><summary> ${md.utils.escapeHtml(m[1])} </summary>\n`
    } else {
      // closing tag
      return '</details>\n'
    }
  },
}

const html5EmbedConfig = {
  html5embed: {
    useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
    attributes: {
      audio: 'controls preload="metadata"',
      video: 'width="100%" max-height="100%" controls loop preload="metadata"',
    },
  },
}

export const md: MarkdownIt = new MarkdownIt()
  .use(markdownItSup)
  .use(markdownItSub)
  .use(markdownItContainer, 'spoiler', spoilerConfig)
  .use(markdownItRuby)
  .use(markdownItHighlightJS, { inline: true })
  .use(markdownItTexmath)
  .use(markdownItTaskLists)
  .use(markdownItFootnote)
  .use(markdownItHtml5Embed, html5EmbedConfig)
  .use(markdownItAnchor)
  .use(markdownItTocDoneRight)

export const mdLimited: MarkdownIt = new MarkdownIt('zero').enable([
  'emphasis',
  'backticks',
  'strikethrough',
])

export function mdToHtml(text?: string) {
  if (!text) return undefined
  return { __html: sanitize(md.render(text)) }
}
