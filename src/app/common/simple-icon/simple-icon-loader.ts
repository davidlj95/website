import { inject, InjectionToken } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, EMPTY, filter, Observable, of, tap } from 'rxjs'
import { PLATFORM_SERVICE } from '@/common/platform.service'

export type SimpleIconLoader = (slug: string) => Observable<string>

/**
 * Loads simple icon SVG file contents given the icon slug
 *
 * Icon files are generated at build time by a script, inspecting the resume technologies
 *
 * ⚠️ Not compatible with SSR yet.
 * Would require a bit of logic to import instead of HTTP request in the server
 * https://github.com/davidlj95/chrislb/tree/72f4f5e6c11719bf2c2ba81941967a04c43d542b/src/app/common/json-fetcher
 */
export const SIMPLE_ICON_LOADER = new InjectionToken<SimpleIconLoader>(
  /* istanbul ignore next */
  isDevMode ? 'SimpleIconLoader' : 'SIL',
  {
    factory: () => {
      if (!inject(PLATFORM_SERVICE).isBrowser) {
        return () => EMPTY
      }
      const httpClient = inject(HttpClient)
      const cache = inject(SIMPLE_ICON_LOADER_CACHE)
      return (slug: string) => {
        const cachedIcon = cache.get(slug)
        return cachedIcon
          ? of(cachedIcon)
          : httpClient
              .get(`${SIMPLE_ICONS_DIR}/${slug}${SVG_EXTENSION}`, {
                responseType: 'text',
              })
              .pipe(
                filter((svg) => svg.trimStart().startsWith('<svg')),
                tap((svg) => cache.set(slug, svg)),
                catchError(() => EMPTY),
              )
      }
    },
  },
)

const SVG_EXTENSION = '.svg'
const SIMPLE_ICONS_DIR = '/images/simple-icons'
type SimpleIconLoaderCache = Map<string, string>
const SIMPLE_ICON_LOADER_CACHE = new InjectionToken<SimpleIconLoaderCache>(
  /* istanbul ignore next */
  isDevMode ? 'SimpleIconLoaderCache' : 'SILC',
  {
    factory: () => new Map(),
  },
)
