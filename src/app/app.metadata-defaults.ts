import { METADATA } from '@/data/metadata'
import {
  OPEN_GRAPH_TYPE_WEBSITE,
  OpenGraphMetadata,
} from '@davidlj95/ngx-meta/open-graph'
import {
  TWITTER_CARD_TYPE_SUMMARY,
  TwitterCardMetadata,
} from '@davidlj95/ngx-meta/twitter-card'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { StandardMetadata } from '@davidlj95/ngx-meta/standard'

export const METADATA_DEFAULTS = {
  locale: 'en',
  applicationName: METADATA.siteName,
  standard: {
    author: METADATA.nickname,
    generator: true,
  },
  openGraph: {
    type: OPEN_GRAPH_TYPE_WEBSITE,
  },
  twitterCard: {
    card: TWITTER_CARD_TYPE_SUMMARY,
    creator: { username: METADATA.twitterUsername },
    site: {
      username: METADATA.twitterUsername,
    },
  },
  // TODO: Add them into `@davidlj95/ngx-meta`
  // https://github.com/davidlj95/ngx/discussions/422
  //extra: [
  //  { property: 'fb:admins', content: METADATA.nickname },
  //  { name: 'facebook-domain-verification', content: '1299426610587748' },
  //],
} satisfies GlobalMetadata &
  StandardMetadata &
  OpenGraphMetadata &
  TwitterCardMetadata
