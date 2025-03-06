import {
  GlobalMetadata,
  provideNgxMetaCore,
  TitleFormatter,
  withNgxMetaBaseUrl,
  withNgxMetaDefaults,
  withNgxMetaTitleFormatter,
} from '@davidlj95/ngx-meta/core'
import { provideNgxMetaRouting } from '@davidlj95/ngx-meta/routing'
import {
  provideNgxMetaStandard,
  StandardMetadata,
} from '@davidlj95/ngx-meta/standard'
import {
  OPEN_GRAPH_TYPE_WEBSITE,
  OpenGraphMetadata,
  provideNgxMetaOpenGraph,
} from '@davidlj95/ngx-meta/open-graph'
import {
  provideNgxMetaTwitterCard,
  TWITTER_CARD_TYPE_SUMMARY,
  TwitterCardMetadata,
} from '@davidlj95/ngx-meta/twitter-card'
import { EnvironmentProviders, Provider } from '@angular/core'
import { environment } from '../environments'
import { METADATA } from '@/data/metadata'

/** @visibleForTesting **/
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

/** @visibleForTesting **/
export const titleFormatter: TitleFormatter = (title) =>
  `${title} | ${METADATA.nickname}`
export const METADATA_PROVIDERS: readonly (Provider | EnvironmentProviders)[] =
  [
    provideNgxMetaCore(
      withNgxMetaDefaults(METADATA_DEFAULTS),
      withNgxMetaBaseUrl(environment.appBaseUrl.toString()),
      withNgxMetaTitleFormatter(titleFormatter),
    ),
    provideNgxMetaRouting(),
    provideNgxMetaStandard(),
    provideNgxMetaOpenGraph(),
    provideNgxMetaTwitterCard(),
  ]
