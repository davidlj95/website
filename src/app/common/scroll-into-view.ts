import { inject, InjectionToken } from '@angular/core'
import { PLATFORM_SERVICE } from '@/common/platform.service'
import { noop } from 'rxjs'

const scrollIntoView: ScrollIntoView = (element: HTMLElement) =>
  element.scrollIntoView && element.scrollIntoView({ block: 'nearest' })
export type ScrollIntoView = (element: HTMLElement) => void

/**
 * @visibleForTesting
 *
 * Otherwise, don't know how to mock the {@link PlatformService} due to `providedIn: 'platform'`
 *
 * Given `TestBed` configures things after platform is already bootstrapped.
 * At that point, the token is already there with the proper {@link PlatformService}
 *
 * As workaround, creating another provider for it when testing using the same factory.
 * That's why it's exported
 */
export const SCROLL_INTO_VIEW_FACTORY: () => ScrollIntoView = () =>
  inject(PLATFORM_SERVICE).isBrowser ? scrollIntoView : noop
export const SCROLL_INTO_VIEW = new InjectionToken<ScrollIntoView>(
  /* istanbul ignore next */
  isDevMode ? 'ScrollIntoView' : 'SIV',
  {
    providedIn: 'platform',
    factory: SCROLL_INTO_VIEW_FACTORY,
  },
)
