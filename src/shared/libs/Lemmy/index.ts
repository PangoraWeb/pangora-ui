import { LemmyHttp } from 'lemmy-js-client'

export const baseName = 'programming.dev'
export const baseUrl = 'https://' + baseName
export const client: LemmyHttp = new LemmyHttp(baseUrl)
