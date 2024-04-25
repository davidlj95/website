import { inject, InjectionToken } from '@angular/core'
import { isDevMode } from '@/common/is-dev-mode'
import { PLATFORM_SERVICE } from '@/common/platform.service'
import { noop } from 'rxjs'

const scrollIntoView: ScrollIntoView = (element: HTMLElement) =>
  element.scrollIntoView && element.scrollIntoView({ block: 'nearest' })
export type ScrollIntoView = (element: HTMLElement) => void
/**
 * @visibleForTesting
 */
export const _SCROLL_INTO_VIEW_FACTORY: () => ScrollIntoView = () =>
  inject(PLATFORM_SERVICE).isBrowser ? scrollIntoView : noop
export const SCROLL_INTO_VIEW = new InjectionToken<ScrollIntoView>(
  isDevMode ? 'ScrollIntoView' : 'SIV',
  {
    providedIn: 'platform',
    factory: _SCROLL_INTO_VIEW_FACTORY,
  },
)
