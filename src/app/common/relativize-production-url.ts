import { inject, InjectionToken } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { isDevMode } from '@/common/is-dev-mode'
import { METADATA } from '../metadata'

export type RelativizeProductionUrl = (url: URL) => string
export const _RELATIVIZE_PRODUCTION_URL_FACTORY: (
  baseUrl: URL,
  baseHref: string | null,
) => RelativizeProductionUrl = (baseUrl, baseHref) => (url) => {
  if (!url.toString().startsWith(baseUrl.toString())) {
    throw new Error(
      'Cannot map production URL: does not start with base URL for production',
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
          'Cannot map production URL: path does not start with app base href',
        )
      }
      return '/' + url.pathname.replace(baseHref, '')
  }
}
export const RELATIVIZE_PRODUCTION_URL =
  new InjectionToken<RelativizeProductionUrl>(
    isDevMode ? 'RelativizeProductionUrl' : 'RPU',
    {
      factory: () =>
        _RELATIVIZE_PRODUCTION_URL_FACTORY(
          inject(APP_BASE_URL_PRODUCTION),
          inject(APP_BASE_HREF, { optional: true }),
        ),
    },
  )

export const APP_BASE_URL_PRODUCTION = new InjectionToken<URL>(
  isDevMode ? 'App base URL for production' : 'ABUfP',
  {
    factory: () => new URL(`https://${METADATA.domainName}`),
  },
)
