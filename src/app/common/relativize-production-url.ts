import { inject, InjectionToken } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { METADATA } from '@/data/metadata'

/** @visibleForTesting */
export type RelativizeProductionUrl = (url: URL) => string
const RELATIVIZE_PRODUCTION_URL_FACTORY: (
  baseUrl: URL,
  baseHref: string | null,
) => RelativizeProductionUrl = (baseUrl, baseHref) => (url) => {
  if (!url.toString().startsWith(baseUrl.toString())) {
    throw new Error(
      /* istanbul ignore next */
      isDevMode
        ? 'Cannot map production URL: does not start with base URL for production'
        : 'RPU:E:BU',
    )
  }
  switch (baseHref) {
    case '':
    case null:
    case '/':
      return url.pathname
    default:
      if (!url.pathname.startsWith(baseHref)) {
        throw new Error(
          /* istanbul ignore next */
          isDevMode
            ? 'Cannot map production URL: path does not start with app base href'
            : 'RPU:E:BH',
        )
      }
      return '/' + url.pathname.replace(baseHref, '')
  }
}
export const RELATIVIZE_PRODUCTION_URL =
  new InjectionToken<RelativizeProductionUrl>(
    /* istanbul ignore next */
    isDevMode ? 'RelativizeProductionUrl' : 'RPU',
    {
      factory: () =>
        RELATIVIZE_PRODUCTION_URL_FACTORY(
          inject(APP_BASE_URL_PRODUCTION),
          inject(APP_BASE_HREF, { optional: true }),
        ),
    },
  )

/** @visibleForTesting */
export const APP_BASE_URL_PRODUCTION = new InjectionToken<URL>(
  /* istanbul ignore next */
  isDevMode ? 'App base URL for production' : 'ABUfP',
  {
    factory: () => new URL(`https://${METADATA.domainName}`),
  },
)
