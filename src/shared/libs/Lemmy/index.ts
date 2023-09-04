import { LemmyHttp } from 'lemmy-js-client'

export const baseUrl = 'https://programming.dev'
export const client: LemmyHttp = new LemmyHttp(baseUrl)
